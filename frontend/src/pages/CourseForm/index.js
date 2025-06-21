import { Box, Container, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '~/components/atoms/InputField';
import PrimaryButton from '~/components/atoms/PrimaryButton';
import TextButton from '~/components/atoms/TextButton';
import { useSnackbar } from '~/contexts/SnackbarContext';
import { createCourse, getCourseById, updateCourse } from '~/services/courseService';
import stylesFn from './styles';

export default function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();
  const styles = stylesFn(theme);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const startDate = watch('start_date');

  useEffect(() => {
    if (isEdit) {
      const fetchCourse = async () => {
        try {
          const course = await getCourseById(id);
          Object.entries(course).forEach(([key, value]) => setValue(key, value));
        } catch (err) {
          console.log('Erro ao carregar o curso:', err);
        }
      };
      fetchCourse();
    }
  }, [id, isEdit, setValue]);

  const onSubmit = async data => {
    try {
      if (isEdit) {
        await updateCourse(id, data);
        showSnackbar('Curso atualizado com sucesso!', 'success');
        navigate('/courses/' + id);
      } else {
        await createCourse(data);
        showSnackbar('Curso criado com sucesso!', 'success');
        navigate('/dashboard');
      }
    } catch (err) {
      showSnackbar('Erro ao salvar o curso', 'error');
    }
  };

  return (
    <Container maxWidth={false} sx={styles.containerBox}>
      <Box sx={styles.contentContainer}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" sx={styles.title}>
            {isEdit ? 'Editar Curso' : 'Novo Curso'}
          </Typography>

          <Stack spacing={1}>
            <InputField
              label="Nome *"
              name="name"
              placeholder="Digite o nome do curso"
              register={register}
              rules={{
                required: 'Nome é obrigatório',
                minLength: {
                  value: 3,
                  message: 'Nome deve ter no mínimo 3 caracteres',
                },
              }}
              errors={errors}
            />
            <InputField
              label="Descrição"
              name="description"
              placeholder="Digite a descrição do curso"
              register={register}
              rules={{
                maxLength: {
                  value: 500,
                  message: 'Descrição não pode ter mais de 500 caracteres',
                },
              }}
              errors={errors}
            />
            <InputField
              label="Data de Início *"
              name="start_date"
              type="date"
              register={register}
              rules={{ required: 'Campo obrigatório' }}
              errors={errors}
              hideLabel
            />
            <InputField
              label="Data de Fim * "
              name="end_date"
              type="date"
              register={register}
              rules={{
                required: 'Campo obrigatório',
                validate: value =>
                  !startDate ||
                  value >= startDate ||
                  'A data de fim deve ser posterior à data de início',
              }}
              errors={errors}
              hideLabel
            />

            <Box mt={2}>
              <Stack direction="row" spacing={2} sx={styles.buttonRow}>
                <TextButton onClick={() => navigate(-1)}>Cancelar</TextButton>
                <PrimaryButton type="submit">Salvar</PrimaryButton>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
