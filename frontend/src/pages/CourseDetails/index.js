import { Box, Container, Divider, Pagination, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ErrorMessage from '~/components/atoms/ErrorMessage';
import LoadingIndicator from '~/components/atoms/LoadingIndicator';
import CourseActionsButtons from '~/components/atoms/CourseActionsButtons';
import CourseDateChips from '~/components/atoms/CourseDateChips';
import TextButton from '~/components/atoms/TextButton';
import InstructorsList from '~/components/molecules/InstructorsList';
import ConfirmDialog from '~/components/molecules/ConfirmDialog';
import LessonFilter from '~/components/molecules/LessonFilter';
import LessonList from '~/components/organisms/LessonList';
import { useSnackbar } from '~/contexts/SnackbarContext';
import { deleteCourse, getCourseById } from '~/services/courseService';
import { deleteLesson, getLessons } from '~/services/lessonService';
import stylesFn from './styles';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = stylesFn(theme);

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState({ title: '', status: '', page: 1, limit: 10 });
  const [openCourseDialog, setOpenCourseDialog] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const { showSnackbar } = useSnackbar();

  const debounceTimeout = useRef(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        setError(true);
      }
    };
    fetchCourse();
  }, [id]);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const { title, status, page, limit } = filters;
        const course_id = id;

        const data = await getLessons({ course_id, title, status, page, limit });
        setLessons(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(fetchLessons, 500);

    return () => clearTimeout(debounceTimeout.current);
  }, [filters, id, course]);

  const handleFilterChange = newFilters => setFilters(prev => ({ ...prev, ...newFilters }));

  const handlePageChange = (_, value) => setFilters(prev => ({ ...prev, page: value }));

  const handleEdit = () => navigate(`/courses/${id}/edit`);
  const handleDelete = () => setOpenCourseDialog(true);
  const handleCancelCourseDelete = () => setOpenCourseDialog(false);
  const handleConfirmCourseDelete = async () => {
    try {
      await deleteCourse(id);
      navigate('/dashboard');
      showSnackbar('Curso excluido com sucesso!', 'success');
    } catch (err) {
      showSnackbar('Erro ao excluir curso', 'error');
    }
    setOpenCourseDialog(false);
  };

  const handleDeleteLesson = lessonId => setLessonToDelete(lessonId);
  const handleCancelLessonDelete = () => setLessonToDelete(null);
  const handleConfirmLessonDelete = async () => {
    try {
      await deleteLesson(lessonToDelete);
      setFilters(prev => ({ ...prev }));
      showSnackbar('Aula excluida com sucesso!', 'success');
    } catch (err) {
      showSnackbar('Erro ao excluir aula', 'error');
    }
    setLessonToDelete(null);
  };

  if (loading) return <LoadingIndicator />;
  if (error || !course) return <ErrorMessage message="Curso não encontrado." />;

  return (
    <Box sx={styles.containerBox}>
      <Container maxWidth={false} sx={styles.contentContainer}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={styles.headerTitle}>
            {course.name}
          </Typography>
          {course.canManage && (
            <CourseActionsButtons onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </Box>

        <Typography sx={styles.courseDescription}>
          {course.description || 'Sem descrição'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <CourseDateChips startDate={course.start_date} endDate={course.end_date} />
        </Box>
        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={styles.title}>
            Instrutores
          </Typography>
          {course.canManage && (
            <TextButton onClick={() => navigate(`/courses/${id}/instructors`)}>
              Gerenciar Instrutores
            </TextButton>
          )}
        </Box>
        <InstructorsList instructors={course.instructors} />
        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={styles.title}>
            Aulas
          </Typography>
          <TextButton onClick={() => navigate(`/courses/${id}/lessons/new`)}>
            Adicionar Aula
          </TextButton>
        </Box>
        <LessonFilter filters={filters} onFilterChange={handleFilterChange} />
        <LessonList lessons={lessons.data} onDeleteLesson={handleDeleteLesson} />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={lessons.pages}
            page={filters.page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Container>

      <ConfirmDialog
        open={openCourseDialog}
        onClose={handleCancelCourseDelete}
        onConfirm={handleConfirmCourseDelete}
        message="Tem certeza de que deseja excluir este curso?"
      />
      <ConfirmDialog
        open={Boolean(lessonToDelete)}
        onClose={handleCancelLessonDelete}
        onConfirm={handleConfirmLessonDelete}
        message="Tem certeza de que deseja excluir esta aula?"
      />
    </Box>
  );
}
