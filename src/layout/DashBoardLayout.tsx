import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import SideBar from '@/components/dashboard/SideBar';
import TopBar from '@/components/dashboard/TopBar';
import { Outlet } from 'react-router-dom';
import useInfoStore from '@/store/useInfoStore';
import useAuthStore from '@/store/useAuthStore';

const DashboardLayout = () => {
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
          backgroundColor: '#002f62',
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
        <Grid>
          <TopBar user={user} />
        </Grid>

        {/* Content */}
        <Grid
          sx={{
            flex: 1,
            backgroundColor: 'white', // Белый фон
            padding: 2, // Отступы
            border: `10px solid lightgray`, // Используем цвет из темы или стандартный
          }}
        >
          <Outlet context={{ selectedMuseum, info }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
