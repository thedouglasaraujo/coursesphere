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

  headerTitle: {
    fontWeight: 700,
    color: theme.palette.primary.main,
  },

  title: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    mb: 2,
  },

  courseDescription: {
    color: theme.palette.text.secondary,
    mt: 2,
  },

  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  dateChipsBox: {
    display: 'flex',
    gap: 2,
    marginTop: theme.spacing(2),
  },
  
  paginationBox: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
});

export default styles;
