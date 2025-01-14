import React from 'react';
import { Box } from '@mui/material';

const Content: React.FC = () => {
  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        bgcolor: '#F4F4F5', // Светло-серый фон
        p: 3,
      }}
    >
      <div>Content</div>
    </Box>
  );
};

export default Content;
