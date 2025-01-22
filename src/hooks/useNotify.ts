// utils/showMessage.ts
import { enqueueSnackbar } from 'notistack';

const showMessage = (
  type: 'success' | 'error' | 'info' | 'warning',
  content: string
) => {
  enqueueSnackbar(content, {
    variant: type,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    autoHideDuration: 3000,
  });
};

export default showMessage;
