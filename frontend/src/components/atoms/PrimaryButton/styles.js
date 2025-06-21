const styles = theme => ({
  defaultButton: {
    borderRadius: 2,
    px: 4,
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(44, 62, 80, 0.3)',
    transition: 'all 0.3s ease',
    bgcolor: theme.palette.primary.main,
    '&:hover': {
      bgcolor: theme.palette.primary.dark,
      boxShadow: '0 6px 14px rgba(52, 152, 219, 0.5)',
      transform: 'translateY(-2px)',
    },
  },
});

export default styles;
