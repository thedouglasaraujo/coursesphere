import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';

export default function TopBar() {
    const { user, logout } = useAuth();

    return (
        <AppBar position="static" color="primary" elevation={2}>
            <Toolbar>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        px: 3,
                    }}
                >
                    <Typography
                        variant="h5"
                        component={RouterLink}
                        to="/dashboard"
                        sx={{ color: 'inherit', textDecoration: 'none' }}
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