import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LESSON_STATUS_OPTIONS } from '~/constants/lessonStatus';
import stylesFn from './styles';

export default function LessonFilter({ filters, onFilterChange }) {
  const theme = useTheme();
  const styles = stylesFn(theme);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <Box sx={styles.filterBox}>
      <TextField
        label="Título"
        name="title"
        value={filters.title}
        onChange={handleFilterChange}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select name="status" value={filters.status} onChange={handleFilterChange} label="Status">
          <MenuItem value="">
            <em>Todos</em>
          </MenuItem>
          {LESSON_STATUS_OPTIONS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
