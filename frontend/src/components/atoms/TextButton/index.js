import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import stylesFn from './styles';

export default function TextButton({ onClick, children, sx, ...props }) {
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <Button variant="text" onClick={onClick} sx={{ ...styles.button, ...sx }} {...props}>
      {children}
    </Button>
  );
}
