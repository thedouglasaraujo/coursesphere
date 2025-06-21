import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '~/components/atoms/ErrorMessage';
import LoadingIndicator from '~/components/atoms/LoadingIndicator';
import PrimaryButton from '~/components/atoms/PrimaryButton';
import CourseDateChips from '~/components/atoms/CourseDateChips';
import { getCourses } from '~/services/courseService';
import stylesFn from './styles';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = stylesFn(theme);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message="Erro ao carregar cursos." />;

  return (
    <Box sx={styles.containerBox}>
      <Container maxWidth={false} sx={styles.contentContainer}>
        <Box sx={styles.headerBox}>
          <Typography variant="h4" sx={styles.headerTitle}>
            Meus Cursos
          </Typography>
          <PrimaryButton onClick={() => navigate('/courses/new')}>Novo Curso</PrimaryButton>
        </Box>

        {courses.length === 0 ? (
          <Typography sx={styles.noCoursesText}>Nenhum curso encontrado.</Typography>
        ) : (
          <Grid container spacing={4}>
            {courses.map(course => (
              <Grid item xs={12} sm={6} key={course.id}>
                <Card
                  sx={styles.card}
                  onClick={() => navigate(`/courses/${course.id}`)}
                  elevation={0}
                >
                  <Box>
                    <Typography variant="h6" sx={styles.title}>
                      {course.name}
                    </Typography>
                    <Typography variant="body2" sx={styles.description}>
                      {course.description || 'Sem descrição'}
                    </Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <CourseDateChips startDate={course.start_date} endDate={course.end_date} />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
