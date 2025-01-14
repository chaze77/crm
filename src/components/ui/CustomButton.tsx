import React from 'react';
import { Button } from '@mui/material';

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  disabled,
  fullWidth,
}) => {
  return (
    <Button
      variant='contained'
      sx={{
        textTransform: 'none',
        backgroundColor: '#673de6',
        color: 'white',
        px: 4,
        py: 1,
        '&:hover': { backgroundColor: '#562bc4' },
      }}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
