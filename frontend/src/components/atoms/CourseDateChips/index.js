import EventIcon from '@mui/icons-material/Event';
import { Box, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { formatDateBR } from '~/utils/dateUtils';
import stylesFn from './styles';

export default function CourseDateChips({ startDate, endDate }) {
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <Box sx={styles.container}>
      <Chip
        icon={<EventIcon />}
        label={`Início: ${formatDateBR(startDate)}`}
        variant="outlined"
        color="primary"
      />
      <Chip
        icon={<EventIcon />}
        label={`Fim: ${formatDateBR(endDate)}`}
        variant="outlined"
        color="secondary"
      />
    </Box>
  );
}
