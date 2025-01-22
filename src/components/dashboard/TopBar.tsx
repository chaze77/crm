import { useState } from 'react';
import { AppBar, Toolbar, Typography, Stack, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuthStore from '@/store/useAuthStore';
import Modal from '../ui/CustomModal';
import { User } from '@/types'; // Типизация для User из вашего интерфейса

interface Props {
  user: User | null; // user может быть либо объектом User, либо null
}

const TopBar: React.FC<Props> = ({ user }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const logout = useAuthStore((state) => state.logout);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmLogout = () => {
    logout();
    handleCloseModal();
  };

  return (
    <>
      <AppBar
        position='relative'
        sx={{
          backgroundColor: '#002f62',
          color: 'white',
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {user && (
            <Stack
              direction='row'
              spacing={2}
              alignItems='center'
            >
              <Typography>{user?.email}</Typography>
              <IconButton
                onClick={handleOpenModal}
                color='secondary'
              >
                <LogoutIcon />
              </IconButton>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
        content='Вы уверены, что хотите выйти из системы?'
      />
    </>
  );
};

export default TopBar;
