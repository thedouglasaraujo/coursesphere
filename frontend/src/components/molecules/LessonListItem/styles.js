const styles = theme => ({
  lessonCard: {
    width: '100%',
    bgcolor: theme.palette.grey[100],
    borderRadius: 3,
    boxShadow: '0 5px 20px rgba(44, 62, 80, 0.1)',
  },

  lessonCardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  lessonTitle: {
    fontWeight: 600,
    color: theme.palette.grey[700],
  },

  image: {
    width: '160px',
    height: '100px',
    borderRadius: '8px',
  },

  listItem: {
    mb: 2,
  },

  thumbnailBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
});

export default styles;
