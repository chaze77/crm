import React from 'react';
import { Box, Toolbar } from '@mui/material';
import TopBar from '@/components/dashboard/TopBar';
import SideBar from '@/components/dashboard/SideBar';
import Content from '@/components/dashboard/Content';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Верхняя панель */}

      {/* Боковое меню */}
      <SideBar />
      <TopBar />

      {/* Основной контент */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          bgcolor: '#F4F4F5',
          p: 3,
        }}
      >
        <Toolbar />
        <Content />
      </Box>
    </Box>
  );
};

export default Dashboard;
