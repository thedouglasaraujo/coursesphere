import { Box, Button, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import stylesFn from './styles';

export default function ErrorPage({ code = 403, message }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = stylesFn(theme);

  const defaultMessages = {
    403: 'Você não tem permissão para acessar esta página.',
    404: 'Página não encontrada.',
    500: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
  };

  return (
    <Box sx={styles.container}>
      <Container sx={styles.content}>
        <Typography variant="h2" sx={styles.code}>
          {code}
        </Typography>
        <Typography variant="h5" sx={styles.message}>
          {message || defaultMessages[code] || 'Erro desconhecido.'}
        </Typography>
        <Button variant="contained" onClick={() => navigate('/dashboard')} sx={styles.button}>
          Voltar ao Início
        </Button>
      </Container>
    </Box>
  );
}
