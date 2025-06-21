import { TextField, Typography } from '@mui/material';

export default function InputField({
    label,
    register,
    name,
    rules,
    errors,
    type = 'text',
    sxLabel,
    placeholder,
}) {
    return (
        <>
            <Typography variant="subtitle1" sx={sxLabel}>
                {label}
            </Typography>
            <TextField
                placeholder={placeholder}
                fullWidth
                margin="normal"
                type={type}
                {...register(name, rules)}
                error={!!errors[name]}
                helperText={errors[name]?.message}
            />
        </>
    );
}