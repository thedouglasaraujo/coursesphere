import { Chip } from '@mui/material';

const STATUS_CONFIG = {
  draft: { label: 'Em Rascunho', color: 'default' },
  archived: { label: 'Arquivada', color: 'warning' },
  published: { label: 'Publicada', color: 'success' },
};

export default function StatusChip({ status }) {
  const { label, color } = STATUS_CONFIG[status] || {
    label: status,
    color: 'default',
  };

  return <Chip label={label} color={color} />;
}