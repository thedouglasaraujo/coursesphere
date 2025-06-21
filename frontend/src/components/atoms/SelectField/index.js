import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

export default function SelectField({
  label,
  name,
  register,
  rules,
  errors,
  options,
  placeholder,
}) {
  return (
    <>
      <Typography variant="subtitle1">{label}</Typography>
      <FormControl fullWidth margin="normal" error={!!errors[name]}>
        <InputLabel>{placeholder}</InputLabel>
        <Select {...register(name, rules)} label={label}>
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </>
  );
}
