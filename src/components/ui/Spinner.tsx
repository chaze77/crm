import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 100,
      }}
    >
      <Stack
        sx={{ color: 'grey.500' }}
        spacing={2}
        direction='row'
      >
        <CircularProgress color='secondary' />
      </Stack>
    </div>
  );
}
