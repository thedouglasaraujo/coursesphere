import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import stylesFn from './styles';

export default function ImportExternalInstructorsModal({ open, onClose, onAdd }) {
  const [loading, setLoading] = useState(false);
  const [externalInstructors, setExternalInstructors] = useState([]);
  const theme = useTheme();
  const styles = stylesFn(theme);

  const fetchExternalInstructors = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://randomuser.me/api/?results=5&inc=name,email,picture');
      const data = await response.json();
      setExternalInstructors(data.results);
    } catch (err) {
      console.error('Erro ao buscar instrutores externos', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchExternalInstructors();
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalBox}>
        <Typography variant="h6" sx={styles.title}>
          Importar Instrutores Externos
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Instrutores sugeridos:
            </Typography>
            {externalInstructors.length > 0 ? (
              <List sx={{ mt: 2 }}>
                {externalInstructors.map((instructor, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => onAdd(instructor)}>
                        <AddIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={`${instructor.name.first} ${instructor.name.last}`}
                      secondary={instructor.email}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                Nenhum instrutor externo encontrado.
              </Typography>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
}
