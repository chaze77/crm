import { create } from 'zustand';
import { account } from '@/appwrite/config';
import showMessage from '@/hooks/useNotify';
import messages from '@/constants/messages';
import { translateError } from '../utils/translateError';

type AuthState = {
  user: any | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  isAuthenticated: false,

  login: async (email: string, password: string): Promise<void> => {
    try {
      await account.createEmailPasswordSession(email, password);
      showMessage('success', messages.auth.loginSuccess);
      await useAuthStore.getState().fetchUser();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error('Ошибка авторизации:', error);
      showMessage('error', translateError(errorMessage));
    }
  },

  fetchUser: async () => {
    try {
      const user = await account.get();
      const isAdmin = user.labels?.includes('museum') || false;
      set({ user: user, isAdmin: isAdmin, isAuthenticated: true });
    } catch (error: unknown) {
      console.error('Пользователь не авторизован:', error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      showMessage('error', translateError(errorMessage as string));
      set({ user: null, isAdmin: false, isAuthenticated: false });
    }
  },
  logout: async () => {
    try {
      await account.deleteSession('current');
      set({ user: null, isAdmin: false, isAuthenticated: false });
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  },
}));
export default useAuthStore;
