const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '90vh',
        width: '100vw',
    },
    message: {
        marginTop: theme.spacing(2),
        color: theme.palette.primary.main,
    },
});

export default styles;
