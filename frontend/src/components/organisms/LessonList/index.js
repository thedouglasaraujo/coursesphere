import { List, Typography } from '@mui/material';
import LessonListItem from '~/components/molecules/LessonListItem';

export default function LessonList({ lessons = [], onDeleteLesson }) {
  return (
    <List>
      {lessons.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          Nenhuma aula encontrada.
        </Typography>
      ) : (
        lessons.map(lesson => <LessonListItem key={lesson.id} lesson={lesson} onDelete={onDeleteLesson} />)
      )}
    </List>
  );
}
