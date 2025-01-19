import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const SideBar = () => {
  const links = [
    { path: '/about-us', label: 'О себе', icon: <InfoIcon /> },
    { path: '/tickets', label: 'Билеты', icon: <LocalActivityIcon /> },

    {
      path: '/purchased-tickets',
      label: 'Купленные Билеты',
      icon: <ShoppingCartIcon />,
    },
  ];

  return (
    <Box sx={{ width: '100%', pt: 8 }}>
      <Divider />
      <List sx={{ px: 4 }}>
        {links.map((link) => (
          <ListItem
            key={link.path}
            component={NavLink}
            to={link.path}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&.active': {
                backgroundColor: '#00162e', // Цвет активной ссылки
                color: '#fff',
                borderRadius: '8px',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{link.icon}</ListItemIcon>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
