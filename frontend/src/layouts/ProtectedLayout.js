import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import TopBar from '~/components/organisms/TopBar';

export default function ProtectedLayout() {
    return (
        <>
            <TopBar />
            <Box
                sx={{
                    width: '100%',
                    padding: 0,
                    boxSizing: 'border-box',
                }}
            >
                <Outlet />
            </Box>
        </>
    );
}