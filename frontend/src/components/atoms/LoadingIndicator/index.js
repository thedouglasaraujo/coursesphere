import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingIndicator({ message = 'Carregando...' }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="90vh"
      width="100vw"
    >
      <CircularProgress />
      <Typography mt={2} color="primary">
        {message}
      </Typography>
    </Box>
  );
}
