import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const drawerWidth = 240;

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: collapsed ? 72 : drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: collapsed ? 72 : drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#0B1120',
          color: '#FFF',
          overflowX: 'hidden',
          transition: 'width 0.3s ease',
        },
      }}
    >
      <Toolbar>
        <IconButton
          onClick={toggleCollapse}
          sx={{ color: '#FFF' }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {[
            { text: 'nav 1', icon: <PersonIcon /> },
            { text: 'nav 2', icon: <DashboardIcon /> },
            { text: 'nav 3', icon: <CloudUploadIcon /> },
          ].map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  justifyContent: collapsed ? 'center' : 'initial',
                  px: collapsed ? 2 : 3,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    color: '#FFF',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
