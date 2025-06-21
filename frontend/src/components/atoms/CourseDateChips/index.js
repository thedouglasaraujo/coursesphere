import EventIcon from '@mui/icons-material/Event';
import { Box, Chip } from '@mui/material';
import { formatDateBR } from '~/utils/dateUtils';

export default function CourseDateChips({ startDate, endDate }) {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
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
