import Login from '@/components/login/Login';
import SideBackground from '@/components/login/SideBackground';
import { Box, Grid } from '@mui/material';

const Authorization = () => {
  return (
    <Box component='main'>
      <Grid container>
        <Grid
          item
          xs={12}
          lg={6}
        >
          <Login />
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            display: { xs: 'none', lg: 'flex' },
            background:
              'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
            height: '100vh',
          }}
        >
          <SideBackground />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Authorization;
