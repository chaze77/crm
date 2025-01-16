import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import SideBar from '@/components/dashboard/SideBar';
import TopBar from '@/components/dashboard/TopBar';
import { useTheme } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import useInfoStore from '@/store/useInfoStore';
import useAuthStore from '@/store/useAuthStore';

const DashboardLayout = () => {
  const theme = useTheme();
  const [selectedMuseum, setSelectedMuseum] = useState<any | null>(null);

  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const fetchInfo = useInfoStore((state) => state.fetchInfo);
  const info = useInfoStore((state) => state.info);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await fetchUser();
      }
      if (user) {
        await fetchInfo({ user: user.$id });
      }
    };

    fetchData();
  }, [fetchUser, fetchInfo, user]);

  useEffect(() => {
    console.log('info', info);

    if (info && info.length > 0) {
      setSelectedMuseum(info[0].$id); // Устанавливаем первый музей из списка
    }
  }, [info]);

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
          minHeight: '100vh',
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
          <TopBar user={user} />
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
          {/* Передаем данные и методы через Outlet */}
          <Outlet context={{ selectedMuseum, info }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
