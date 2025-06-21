const styles = theme => ({
    alert: severity => ({
        width: '100%',
        bgcolor: {
            error: '#c62828',
            warning: '#ed6c02',
            success: '#2e7d32',
            info: '#0288d1',
        }[severity],
        color: '#fff',
        '& .MuiAlert-icon': {
            color: '#fff',
        },
    }),
});

export default styles;