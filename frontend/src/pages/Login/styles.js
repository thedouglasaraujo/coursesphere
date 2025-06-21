const styles = theme => ({
  containerBox: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    px: 2,
  },
  paper: {
    p: 4,
    borderRadius: 3,
    bgcolor: theme.palette.grey[100],
    boxShadow: '0 10px 30px rgba(44, 62, 80, 0.2)',
  },
  title: {
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  subtitle: {
    mb: 3,
    color: theme.palette.text.secondary,
  },
  label: {
    mb: 0.5,
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  labelWithMarginTop: {
    mt: 2,
    mb: 0.5,
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  button: {
    mt: 4,
    py: 1.5,
    fontWeight: 700,
    bgcolor: theme.palette.primary.main,
    '&:hover': {
      bgcolor: theme.palette.primary.light,
    },
  },
});

export default styles;
