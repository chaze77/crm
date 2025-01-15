import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.tsx';
import theme from './theme';
import './index.css';
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')!).render(
  <SnackbarProvider maxSnack={3}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </SnackbarProvider>
);
