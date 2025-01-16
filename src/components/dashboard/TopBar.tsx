import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  Button,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useAuthStore from '@/store/useAuthStore';

const TopBar = ({ user }) => {
  const handleMenuToggle = () => {
    console.log('Toggle menu');
  };

  const theme = useTheme();

  const logout = useAuthStore((state) => state.logout);

  return (
    <AppBar
      position='relative'
      sx={{
        backgroundColor: theme.palette.background.main,
        color: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          edge='start'
          color='inherit'
          onClick={handleMenuToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {user && (
          <Stack
            direction='row'
            spacing={2}
            alignItems='center'
          >
            <Typography>{user?.email}</Typography>
            <Button
              variant='contained'
              size='sm'
              onClick={logout}
            >
              Выход
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
