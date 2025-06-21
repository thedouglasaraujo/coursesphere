import { Box, Button } from '@mui/material';
import InputField from '~/components/atoms/InputField';

export default function LoginForm({
    onSubmit,
    register,
    errors,
    handleSubmit,
    sxButton,
    sxLabel,
    sxLabelWithMarginTop,
}) {
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputField
                label="Email"
                name="email"
                placeholder="Digite seu email"
                register={register}
                rules={{
                    required: 'Email é obrigatório',
                    pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' },
                }}
                errors={errors}
                sxLabel={sxLabel}
            />
            <InputField
                label="Senha"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                register={register}
                rules={{
                    required: 'Senha é obrigatória',
                    minLength: { value: 6, message: 'Mínimo de 6 caracteres' },
                }}
                errors={errors}
                sxLabel={sxLabelWithMarginTop}
            />
            <Button type="submit" fullWidth variant="contained" sx={sxButton}>
                Entrar
            </Button>
        </Box>
    );
}