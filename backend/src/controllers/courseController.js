const { Course, User } = require('../models');

module.exports = {
    async create(req, res) {
        try {
            const { name, description, start_date, end_date } = req.body;

            const course = await Course.create({
                name,
                description,
                start_date,
                end_date,
                creator_id: req.user.id
            });

            await course.addInstructor(req.user.id);

            return res.status(201).json(course);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao criar curso' });
        }
    },

    async index(req, res) {
        try {
            const courses = await Course.findAll({
                include: [
                    {
                        association: 'instructors',
                        where: { id: req.user.id },
                        attributes: []
                    }
                ]
            });

            return res.json(courses);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao listar cursos' });
        }
    },

    async show(req, res) {
        try {
            const course = await Course.findByPk(req.params.id, {
                include: [
                    {
                        association: 'instructors',
                        attributes: ['id', 'name', 'email']
                    }
                ]
            });

            if (!course) return res.status(404).json({ error: 'Curso não encontrado' });

            const isInstructor = await course.hasInstructor(req.user.id);
            if (!isInstructor) return res.status(403).json({ error: 'Acesso negado ao curso' });

            const canManage = course.creator_id === req.user.id;

            return res.json({ ...course.toJSON(), canManage });
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao buscar curso' });
        }
    },

    async update(req, res) {
        try {
            const course = await Course.findByPk(req.params.id);
            if (!course) return res.status(404).json({ error: 'Curso não encontrado' });

            if (course.creator_id !== req.user.id) {
                return res.status(403).json({ error: 'Apenas o criador pode editar o curso' });
            }

            await course.update(req.body);
            return res.json(course);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao atualizar curso' });
        }
    },

    async destroy(req, res) {
        try {
            const course = await Course.findByPk(req.params.id);
            if (!course) return res.status(404).json({ error: 'Curso não encontrado' });

            if (course.creator_id !== req.user.id) {
                return res.status(403).json({ error: 'Apenas o criador pode excluir o curso' });
            }

            await course.destroy();
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao excluir curso' });
        }
    },

    async getInstructors(req, res) {
        try {
            const course = await Course.findByPk(req.params.id, {
                include: [
                    {
                        association: 'instructors',
                        attributes: ['id', 'name', 'email']
                    }
                ]
            });

            if (!course) return res.status(404).json({ error: 'Curso não encontrado' });

            return res.json(course.instructors);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao listar instrutores' });
        }
    },

    async addInstructor(req, res) {
        try {
            const { name, email, password } = req.body;

            const course = await Course.findByPk(req.params.id);

            if (!course) {
                return res.status(404).json({ error: 'Curso não encontrado' });
            }

            if (course.creator_id !== req.user.id) {
                return res.status(403).json({ error: 'Apenas o criador pode adicionar instrutores' });
            }

            let user = await User.findOne({ where: { email } });

            if (!user) {
                user = await User.create({ name, email, password });
            }

            await course.addInstructor(user);

            return res.status(200).json({ message: 'Instrutor adicionado com sucesso' });
        } catch (err) {
            console.error('Erro ao adicionar instrutor:', err);
            return res.status(500).json({ error: 'Erro ao adicionar instrutor' });
        }
    },

    async removeInstructor(req, res) {
        try {
            const { userId } = req.body;
            const course = await Course.findByPk(req.params.id);

            if (!course) return res.status(404).json({ error: 'Curso não encontrado' });
            if (course.creator_id !== req.user.id) {
                return res.status(403).json({ error: 'Apenas o criador pode remover instrutores' });
            }

            await course.removeInstructor(userId);
            return res.status(200).json({ message: 'Instrutor removido' });
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao remover instrutor' });
        }
    }
};
