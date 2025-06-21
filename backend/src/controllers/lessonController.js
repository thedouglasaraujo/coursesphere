const { Lesson, Course, CourseInstructors } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    async create(req, res) {
        try {
            const { title, status, publish_date, video_url, course_id } = req.body;

            const course = await Course.findByPk(course_id, {
                include: [{ association: 'instructors', where: { id: req.user.id } }]
            });

            if (!course) return res.status(403).json({ error: 'Você não é instrutor deste curso.' });

            const lesson = await Lesson.create({
                title,
                status,
                publish_date,
                video_url,
                course_id,
                creator_id: req.user.id
            });

            return res.status(201).json(lesson);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao criar tarefa' });
        }
    },

    async index(req, res) {
        try {
            const { title, status, course_id, page = 1, limit = 10 } = req.query;

            const userInstructions = await CourseInstructors.findAll({
                where: { user_id: req.user.id },
                attributes: ['course_id'],
            });

            if (!userInstructions.length) {
                return res.status(403).json({ error: 'Usuário não tem instruções em cursos' });
            }

            const courseIds = userInstructions.map(instr => instr.course_id);

            const filters = {
                course_id: { [Op.in]: courseIds },
            };

            if (course_id) filters.course_id = course_id;
            if (title) filters.title = { [Op.iLike]: `%${title}%` };
            if (status) filters.status = status;

            const lessons = await Lesson.findAndCountAll({
                where: filters,
                include: ['course'],
                limit: parseInt(limit),
                offset: (parseInt(page) - 1) * parseInt(limit),
                order: [['publish_date', 'ASC']],
            });

            const lessonsWithPermissions = lessons.rows.map(lesson => {
                const isLessonCreator = lesson.creator_id === req.user.id;
                const isCourseCreator = lesson.course?.creator_id === req.user.id;
                return {
                    ...lesson.toJSON(),
                    canManage: isLessonCreator || isCourseCreator,
                };
            });

            return res.json({
                total: lessons.count,
                page: parseInt(page),
                pages: Math.ceil(lessons.count / limit),
                data: lessonsWithPermissions,
            });
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao listar tarefas' });
        }
    },

    async show(req, res) {
        try {
            const lesson = await Lesson.findByPk(req.params.id, {
                include: ['creator', 'course']
            });

            if (!lesson) return res.status(404).json({ error: 'Tarefa não encontrada' });

            const course = await Course.findByPk(lesson.course_id, {
                include: [{ association: 'instructors', where: { id: req.user.id } }]
            });

            if (!course) return res.status(403).json({ error: 'Acesso negado à tarefa' });

            return res.json(lesson);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao buscar tarefa' });
        }
    },

    async update(req, res) {
        try {
            const lesson = await Lesson.findByPk(req.params.id);
            if (!lesson) return res.status(404).json({ error: 'Tarefa não encontrada' });

            const course = await Course.findByPk(lesson.course_id);

            if (lesson.creator_id !== req.user.id && course.creator_id !== req.user.id) {
                return res.status(403).json({ error: 'Sem permissão para editar' });
            }

            await lesson.update(req.body);
            return res.json(lesson);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
        }
    },

    async destroy(req, res) {
        try {
            const lesson = await Lesson.findByPk(req.params.id);
            if (!lesson) return res.status(404).json({ error: 'Tarefa não encontrada' });

            const course = await Course.findByPk(lesson.course_id);

            if (lesson.creator_id !== req.user.id && course.creator_id !== req.user.id) {
                return res.status(403).json({ error: 'Sem permissão para excluir' });
            }

            await lesson.destroy();
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao excluir tarefa' });
        }
    }
};
