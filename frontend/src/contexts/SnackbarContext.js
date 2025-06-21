import { createContext, useContext, useState } from 'react';
import AlertSnackbar from '~/components/atoms/AlertSnackbar';

const SnackbarContext = createContext();

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const hideSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <AlertSnackbar
        open={snackbarOpen}
        onClose={hideSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </SnackbarContext.Provider>
  );
};
