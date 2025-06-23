import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import stylesFn from './styles';

export default function ErrorMessage({ message = 'Algo deu errado.' }) {
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.message}>{message}</Typography>
    </Box>
  );
}
