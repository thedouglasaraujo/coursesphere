import { Delete, Edit } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';

export default function CourseActionsButtons({ onEdit, onDelete }) {
  return (
    <Stack direction="row" spacing={1}>
      <Button variant="outlined" color="primary" startIcon={<Edit />} onClick={onEdit}>
        Editar
      </Button>
      <Button variant="outlined" color="error" startIcon={<Delete />} onClick={onDelete}>
        Excluir
      </Button>
    </Stack>
  );
}
