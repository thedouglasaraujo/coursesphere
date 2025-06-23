import { Button } from '@mui/material';
import styles from './styles';

export default function PrimaryButton({ children, onClick, sx = {}, ...props }) {
  return (
    <Button
      variant="contained"
      size="large"
      onClick={onClick}
      sx={theme => ({
        ...styles(theme).defaultButton,
        ...sx,
      })}
      {...props}
    >
      {children}
    </Button>
  );
}
