import Grid from '@mui/material/Grid2';
import SideBar from '@/components/dashboard/SideBar';
import TopBar from '@/components/dashboard/TopBar';
import { useTheme } from '@emotion/react';
import { Outlet } from 'react-router-dom'; // Import Outlet from react-router-dom

const DashboardLayout = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      sx={{
        height: '100vh',
      }}
    >
      {/* Sidebar */}
      <Grid
        size={2}
        sx={{
          backgroundColor: theme.palette.background.main,
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh', // Высота на всю страницу
        }}
      >
        <SideBar />
      </Grid>

      {/* Main Area (TopBar + Content) */}
      <Grid
        container
        direction='column'
        sx={{
          flex: 1,
        }}
      >
        {/* TopBar */}
        <Grid
          sx={{
            backgroundColor: '#ffffff',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}
        >
          <TopBar />
        </Grid>

        {/* Content */}
        <Grid
          sx={{
            flex: 1,
            backgroundColor: '#f4f4f4',
            padding: 2,
            overflow: 'auto',
          }}
        >
          <Outlet /> {/* This will render child routes */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
