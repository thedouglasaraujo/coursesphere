import { Box, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import stylesFn from './styles';

export default function LoadingIndicator({ message = 'Carregando...' }) {
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <Box sx={styles.container}>
      <CircularProgress />
      <Typography sx={styles.message}>
        {message}
      </Typography>
    </Box>
  );
}
