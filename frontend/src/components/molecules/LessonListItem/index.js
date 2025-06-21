import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, CardContent, ListItem, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import StatusChip from '~/components/atoms/StatusChip';
import TextButton from '~/components/atoms/TextButton';
import { formatDateBR } from '~/utils/dateUtils';
import stylesFn from './styles';

export default function LessonListItem({ lesson, onDelete }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <ListItem disablePadding sx={{ mb: 2 }}>
      <Card sx={styles.lessonCard}>
        <CardContent sx={styles.lessonCardContent}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ListItemText
              primary={<Typography sx={styles.lessonTitle}>{lesson.title}</Typography>}
              secondary={`Data de entrega: ${formatDateBR(lesson.due_date)}`}
            />
          </Box>

          <Box>
            <StatusChip status={lesson.status} />
            {lesson.canManage && (
              <>
                <TextButton onClick={() => navigate(`/lessons/${lesson.id}/edit`)}>
                  <EditIcon />
                </TextButton>
                {onDelete && (
                  <TextButton onClick={() => onDelete(lesson.id)}>
                    <DeleteIcon />
                  </TextButton>
                )}
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </ListItem>
  );
}
