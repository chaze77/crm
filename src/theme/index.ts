import { blue, grey, red, teal } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true; // Добавляем поддержку цвета "neutral"
  }
}

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Helvetica',
      'Arial',
      'Apple Color Emoji',
      'Segoe UI Emoji',
    ].join(','),
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 2.5,
      textTransform: 'uppercase',
    },
    h1: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      color: '#00162e',
    },
    h2: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      color: '#00162e',
    },
    h3: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      color: '#00162e',
    },
    h4: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
      color: '#00162e',
    },
    h5: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.2,
      color: '#00162e',
    },
    h6: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: '1.125rem',
      lineHeight: 1.2,
      color: '#2f1c6a',
    },
  },
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: '#be2e1a',
    },
    error: {
      main: red[700],
    },
    neutral: {
      main: grey[700],
      contrastText: '#FFFFFF',
    },
    success: {
      main: teal[500],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
        },
        sizeSmall: {
          padding: '6px 16px',
        },
        sizeMedium: {
          padding: '8px 20px',
        },
        sizeLarge: {
          padding: '11px 24px',
        },
        textSizeSmall: {
          padding: '7px 12px',
        },
        textSizeMedium: {
          padding: '9px 16px',
        },
        textSizeLarge: {
          padding: '12px 16px',
        },
      },
    },
  },
});

export default theme;
