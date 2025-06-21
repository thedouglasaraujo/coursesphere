import { Box, Chip, Typography } from '@mui/material';

export default function InstructorsList({ instructors = [] }) {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
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
