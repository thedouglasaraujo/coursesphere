import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PrimaryButton from '~/components/atoms/PrimaryButton';
import ConfirmDialog from '~/components/molecules/ConfirmDialog';
import AddInstructorModal from '~/components/organisms/AddInstructorModal';
import ImportExternalInstructorsModal from '~/components/organisms/ImportExternalInstructorsModal';
import { useSnackbar } from '~/contexts/SnackbarContext';
import { addInstructor, getInstructors, removeInstructor } from '~/services/courseService';
import stylesFn from './styles';

export default function InstructorsManager() {
  const { id } = useParams();
  const [instructors, setInstructors] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [externalModalOpen, setExternalModalOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [instructorToRemove, setInstructorToRemove] = useState(null);
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();
  const styles = stylesFn(theme);

  const fetchInstructors = async () => {
    try {
      const data = await getInstructors(id);
      setInstructors(data);
    } catch (err) {
      console.log('Erro ao buscar instrutores:', err);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, [id]);

  const handleAddInstructor = async data => {
    try {
      await addInstructor(id, data);
      setModalOpen(false);
      showSnackbar('Instrutor adicionado com sucesso!', 'success');
      fetchInstructors();
    } catch (err) {
      console.log('Erro ao adicionar instrutor:', err);
    }
  };

  const handleRemoveInstructor = userId => {
    setInstructorToRemove(userId);
    setConfirmDialogOpen(true);
  };

  const handleAddExternalInstructor = async instructor => {
    const instructorData = {
      name: `${instructor.name.first} ${instructor.name.last}`,
      email: instructor.email,
      password: '123456',
    };
    try {
      await addInstructor(id, instructorData);
      setExternalModalOpen(false);
      showSnackbar('Instrutor adicionado com sucesso!', 'success');
      fetchInstructors();
    } catch (err) {
      console.log('Erro ao adicionar instrutor externo:', err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await removeInstructor(id, instructorToRemove);
      showSnackbar('Instrutor removido com sucesso!', 'success');
      fetchInstructors();
    } catch (err) {
      showSnackbar('Erro ao remover instrutor', 'error');
    } finally {
      setConfirmDialogOpen(false);
      setInstructorToRemove(null);
    }
  };

  return (
    <Box sx={styles.containerBox}>
      <Container maxWidth={false} sx={styles.contentContainer}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={styles.headerTitle}>
            Instrutores
          </Typography>
          <Stack direction="row" spacing={1}>
            <PrimaryButton onClick={() => setModalOpen(true)}>Adicionar Instrutor</PrimaryButton>
            <PrimaryButton onClick={() => setExternalModalOpen(true)}>
              Importar Instrutor
            </PrimaryButton>
          </Stack>
        </Box>

        <Divider sx={{ my: 4 }} />

        <List>
          {instructors.map(c => (
            <ListItem
              key={c.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleRemoveInstructor(c.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={c.name} secondary={c.email} />
            </ListItem>
          ))}
        </List>
      </Container>

      <AddInstructorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddInstructor}
      />

      <ImportExternalInstructorsModal
        open={externalModalOpen}
        onClose={() => setExternalModalOpen(false)}
        onAdd={handleAddExternalInstructor}
      />

      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Tem certeza de que deseja remover este instrutor?"
      />
    </Box>
  );
}
