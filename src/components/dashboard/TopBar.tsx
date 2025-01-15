import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const TopBar = () => {
  const handleMenuToggle = () => {
    console.log('Toggle menu');
  };

  return (
    <AppBar
      position='relative'
      sx={{
        backgroundColor: '#ffffff',
        color: '#000000',
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          onClick={handleMenuToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant='h6'
          noWrap
        >
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
