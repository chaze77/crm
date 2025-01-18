import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  content?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, onConfirm, content }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
    >
      <Box
        sx={{
          py: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <WarningIcon
            sx={{
              fontSize: '4rem',
              color: 'error.main',
            }}
          />
        </Box>
        <DialogContent
          sx={{
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          {content}
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={onConfirm}
            color='primary'
            variant='outlined'
          >
            Да
          </Button>
          <Button
            onClick={onClose}
            color='neutral'
            variant='outlined'
          >
            Нет
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default Modal;
