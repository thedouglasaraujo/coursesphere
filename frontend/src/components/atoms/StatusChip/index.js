import { Chip } from '@mui/material';
import { STATUS_CONFIG } from '~/constants/lessonStatus';

export default function StatusChip({ status }) {
  const { label, color } = STATUS_CONFIG[status] || {
    label: status,
    color: 'default',
  };

  return <Chip label={label} color={color} />;
}
