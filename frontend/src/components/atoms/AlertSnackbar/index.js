import { Alert, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import stylesFn from './styles';

export default function AlertSnackbar({ open, onClose, severity, message }) {
    const theme = useTheme();
    const styles = stylesFn(theme);

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={onClose} severity={severity} sx={styles.alert(severity)}>
                {message}
            </Alert>
        </Snackbar>
    );
}