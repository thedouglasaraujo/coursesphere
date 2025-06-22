import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, CardContent, ListItem, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import StatusChip from '~/components/atoms/StatusChip';
import TextButton from '~/components/atoms/TextButton';
import { formatDateBR } from '~/utils/dateUtils';
import stylesFn from './styles';

function getYouTubeThumbnail(url) {
  try {
    const videoId = new URL(url).searchParams.get('v');
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  } catch {
    return null;
  }
}

export default function LessonListItem({ lesson, onDelete }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = stylesFn(theme);

  const thumbnailUrl = getYouTubeThumbnail(lesson.video_url);

  return (
    <ListItem disablePadding sx={{ mb: 2 }}>
      <Card sx={styles.lessonCard}>
        <CardContent sx={styles.lessonCardContent}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {thumbnailUrl && <img src={thumbnailUrl} alt="Lesson Thumbnail" style={styles.image} />}

            <ListItemText
              primary={<Typography sx={styles.lessonTitle}>{lesson.title}</Typography>}
              secondary={`Data de publicação: ${formatDateBR(lesson.publish_date)}`}
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
