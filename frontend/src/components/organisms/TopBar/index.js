import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';
import stylesFn from './styles';

export default function TopBar() {
    const { user, logout } = useAuth();
    const theme = useTheme();
    const styles = stylesFn(theme);

    return (
        <AppBar position="static" color="primary" elevation={2}>
            <Toolbar>
                <Box sx={styles.container}>
                    <Typography
                        variant="h5"
                        component={RouterLink}
                        to="/dashboard"
                        sx={styles.logoLink}
                    >
                        CourseSphere
                    </Typography>

                    <Box display="flex" alignItems="center" gap={2}>
                        <Typography variant="h6">{user?.name}</Typography>
                        <Button color="inherit" startIcon={<LogoutIcon />} onClick={logout}>
                            Sair
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
