import { Box } from '@mui/material';

const SideBackground = () => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        background:
          'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        '& img': {
          maxWidth: '100%',
          height: '100vh',
        },
      }}
    />
  );
};

export default SideBackground;
