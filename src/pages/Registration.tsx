import RegisterForm from '@/components/register/RegisterForm';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

const Registration = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
      >
        {/* Форма */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <RegisterForm />
        </Grid>

        {/* Градиент */}
        <Grid
          size={{ xs: 0, lg: 6 }}
          sx={{
            alignItems: 'center',
            background:
              'radial-gradient(50% 50% at 50% 50%, #5A36B7 0%, #2A1771 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            '& img': {
              maxWidth: '100%',
              height: '100vh',
            },
          }}
        ></Grid>
      </Grid>
    </Box>
  );
};

export default Registration;
