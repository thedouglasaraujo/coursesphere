const styles = theme => ({
  containerBox: {
    minHeight: '100vh',
    alignItems: 'flex-start',
    pt: 8,
    px: 2,
  },

  contentContainer: {
    width: '75%',
  },

  headerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 4,
  },

  headerTitle: {
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
});

export default styles;
