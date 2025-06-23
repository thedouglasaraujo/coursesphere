import { Box, Container, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '~/components/atoms/InputField';
import PrimaryButton from '~/components/atoms/PrimaryButton';
import SelectField from '~/components/atoms/SelectField';
import CancelButton from '~/components/atoms/TextButton';
import { LESSON_STATUS_OPTIONS } from '~/constants/lessonStatus';
import { useSnackbar } from '~/contexts/SnackbarContext';
import { createLesson, getLessonById, updateLesson } from '~/services/lessonService';
import stylesFn from './styles';

export default function LessonForm() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(lessonId);
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();
  const styles = stylesFn(theme);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEdit) {
      const fetchLesson = async () => {
        try {
          const lesson = await getLessonById(lessonId);
          reset(lesson);
        } catch (err) {
          console.error('Erro ao carregar aula:', err);
        }
      };
      fetchLesson();
    }
  }, [lessonId, isEdit, reset]);

  const onSubmit = async data => {
    try {
      const lessonData = { ...data, course_id: courseId };

      if (isEdit) {
        await updateLesson(lessonId, lessonData);
        showSnackbar('Aula atualizada com sucesso!', 'success');
      } else {
        await createLesson(lessonData);
        showSnackbar('Aula criada com sucesso!', 'success');
      }

      navigate(-1);
    } catch (err) {
      showSnackbar('Erro ao salvar a aula', 'error');
    }
  };

  return (
    <Container maxWidth={false} sx={styles.containerBox}>
      <Box sx={styles.contentContainer}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" sx={styles.title}>
            {isEdit ? 'Editar Aula' : 'Nova Aula'}
          </Typography>

          <Stack spacing={1}>
            <InputField
              label="Título *"
              name="title"
              placeholder="Digite o título da aula"
              register={register}
              rules={{
                required: 'Campo obrigatório',
                minLength: {
                  value: 3,
                  message: 'O título deve ter no mínimo 3 caracteres',
                },
              }}
              errors={errors}
            />
            <SelectField
              label="Status *"
              name="status"
              placeholder="Selecione o status"
              register={register}
              rules={{ required: 'Campo obrigatório' }}
              errors={errors}
              options={LESSON_STATUS_OPTIONS}
            />
            <InputField
              label="Data de Publicação *"
              name="publish_date"
              type="date"
              register={register}
              rules={{
                required: 'Campo obrigatório',
                validate: value => {
                  const currentDate = new Date();
                  const dueDate = new Date(value);
                  return dueDate > currentDate || 'A data de publicação deve ser no futuro';
                },
              }}
              errors={errors}
              hideLabel
            />
            <InputField
              label="URL do Vídeo *"
              name="video_url"
              placeholder="Digite a URL do vídeo"
              register={register}
              rules={{ required: 'Campo obrigatório' }}
              errors={errors}
            />

            <Box mt={2}>
              <Stack direction="row" spacing={2} sx={styles.buttonRow}>
                <CancelButton onClick={() => navigate(-1)}>Cancelar</CancelButton>
                <PrimaryButton type="submit">Salvar</PrimaryButton>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
