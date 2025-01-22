import { create } from 'zustand';
import useGlobalStore from './useGlobalStore';

import { createDocument } from '@/utils/api';
import showMessage from '@/hooks/useNotify';
import messages from '@/constants/messages';

type FormValues = {
  name: string;
  phone: string;
  email: string;
  comment: string;
};

type RegisterValue = {
  register: (data: FormValues) => Promise<void>;
};

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_FORM_COLLECTION_ID;

const useRegisterStore = create<RegisterValue>(() => ({
  register: async (data): Promise<void> => {
    const { setLoading } = useGlobalStore.getState();
    setLoading(true);
    try {
      await createDocument(DATABASE_ID, COLLECTION_ID, data);
      showMessage('success', messages.register.registerSuccess);
    } catch (error: unknown) {
      console.error('Ошибка авторизации:', error);
      showMessage('success', messages.register.registerError);
    } finally {
      setLoading(false);
    }
  },
}));

export default useRegisterStore;
