const styles = theme => ({
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: theme.palette.background.paper,
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    width: 400,
    maxWidth: '90%',
  },

  title: {
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
});

export default styles;
