const styles = theme => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    px: 2,
  },

  content: {
    textAlign: 'center',
  },

  code: {
    color: theme.palette.error.main,
    fontWeight: 700,
  },

  message: {
    mt: 2,
    mb: 4,
    color: theme.palette.text.primary,
  },

  button: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
});

export default styles;
