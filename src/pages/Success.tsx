import { Box, Typography, useTheme } from '@mui/material';
import successUrl from '../assets/success.svg';

const SuccessPage = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background:
          'linear-gradient(135deg, #4E34A7 0%, #4B6DFF 50%, #1E255E 100%)',
      }}
    >
      <img
        src={successUrl}
        alt='Success Icon'
        style={{ width: '140px', height: '140px' }}
      />
      <Box sx={{ px: 2 }}>
        <Typography
          variant='h4'
          color='white'
          sx={{
            [theme.breakpoints.down('sm')]: {
              fontSize: theme.typography.h5.fontSize,
            },
          }}
        >
          Спасибо за регистрацию, с вами свяжутся в течении нескольких дней
        </Typography>
      </Box>
    </Box>
  );
};

export default SuccessPage;
