import { SnackbarProvider } from '~/contexts/SnackbarContext';
import AppRoutes from '~/routes/Routes';

export default function App() {
  return (
    <SnackbarProvider>
      <AppRoutes />
    </SnackbarProvider>
  );
}
