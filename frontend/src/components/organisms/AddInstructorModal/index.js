import { Box, Modal, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import InputField from '~/components/atoms/InputField';
import PrimaryButton from '~/components/atoms/PrimaryButton';
import TextButton from '~/components/atoms/TextButton';
import stylesFn from './styles';

export default function AddInstructorModal({ open, onClose, onAdd }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    onAdd(data);
    reset();
    onClose();
  };
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalBox}>
        <Typography variant="h6" sx={styles.title}>
          Adicionar Instrutor
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} mt={2}>
            <InputField
              label="Nome *"
              name="name"
              placeholder="Digite o nome do instrutor"
              register={register}
              rules={{ required: 'Nome é obrigatório' }}
              errors={errors}
            />
            <InputField
              label="Email *"
              name="email"
              type="email"
              placeholder="Digite o email do instrutor"
              register={register}
              rules={{
                required: 'Email é obrigatório',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Email inválido',
                },
              }}
              errors={errors}
            />
            <InputField
              label="Senha *"
              name="password"
              type="password"
              placeholder="Digite a senha do instrutor"
              register={register}
              rules={{
                required: 'Senha é obrigatória',
                minLength: {
                  value: 6,
                  message: 'Mínimo de 6 caracteres',
                },
              }}
              errors={errors}
            />
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
            <TextButton onClick={onClose}>Cancelar</TextButton>
            <PrimaryButton type="submit">Adicionar</PrimaryButton>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
