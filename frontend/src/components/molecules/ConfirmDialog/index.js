import { Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import PrimaryButton from '~/components/atoms/PrimaryButton';
import TextButton from '~/components/atoms/TextButton';

export default function ConfirmDialog({ open, onClose, onConfirm, message }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle color="primary" fontWeight={'bold'}>
        Confirmar Ação
      </DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2}>
          <TextButton onClick={onClose}>Cancelar</TextButton>
          <PrimaryButton onClick={onConfirm}>Confirmar</PrimaryButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
