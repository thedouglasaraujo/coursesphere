const styles = theme => ({
  containerBox: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    pt: 8,
    px: 2,
  },

  contentContainer: {
    width: '75%',
  },

  title: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    mb: 3,
  },

  textField: {
    backgroundColor: theme.palette.background.paper,
  },

  buttonRow: {
    mt: 2,
    justifyContent: 'flex-end',
  },
});

export default styles;
