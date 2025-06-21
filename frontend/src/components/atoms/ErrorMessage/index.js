import { Box, Typography } from '@mui/material';

export default function ErrorMessage({ message = 'Algo deu errado.' }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <Typography color="error">{message}</Typography>
    </Box>
  );
}
