import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2C3E50',
      light: '#3498DB',
      dark: '#1A252F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#7F8C8D',
    },
    error: {
      main: '#DB1E2F',
      dark: '#AF0421',
      contrastText: '#FFFFFF',
    },
    grey: {
      100: '#ECF0F1',
      300: '#D0D3D4',
      500: '#7F8C8D',
      700: '#34495E',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightBold: 700,
  },
});

export default theme;
