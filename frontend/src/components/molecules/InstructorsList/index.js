import { Box, Chip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import stylesFn from './styles';

export default function InstructorsList({ instructors = [] }) {
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <Box sx={styles.container}>
      {instructors.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          Nenhum instrutor adicionado.
        </Typography>
      ) : (
        instructors.map(instructor => (
          <Chip
            key={instructor.id}
            label={instructor.name}
            variant="outlined"
            color="primary"
          />
        ))
      )}
    </Box>
  );
}
