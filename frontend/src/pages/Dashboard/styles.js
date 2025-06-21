const styles = theme => ({
  containerBox: {
    minHeight: '100vh',
    alignItems: 'flex-start',
    pt: 8,
    pb: 8,
    px: 2,
  },
  contentContainer: {
    width: '75%',
  },
  card: {
    bgcolor: theme.palette.grey[100],
    borderRadius: 3,
    boxShadow: '0 10px 30px rgba(44, 62, 80, 0.2)',
    minHeight: 220,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    p: 3,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      boxShadow: '0 14px 40px rgba(44, 62, 80, 0.3)',
      transform: 'translateY(-6px)',
    },
    maxWidth: 360,
  },
  headerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 2,
    mb: 4,
  },
  headerTitle: {
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  noCoursesText: {
    color: theme.palette.text.secondary,
    textAlign: 'center',
    mt: 6,
  },
  title: {
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  description: {
    color: theme.palette.text.primary,
    minHeight: 64,
    mb: 2,
  }
});

export default styles;
