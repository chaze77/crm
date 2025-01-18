import { create } from 'zustand';
import { account } from '@/appwrite/config';
import showMessage from '@/hooks/useNotify';
import messages from '@/constants/messages';
import { translateError } from '@/utils/translateError';
import { User } from '@/types';
import useGlobalStore from './useGlobalStore';

type AuthState = {
  user: User | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  initialLoad: boolean; // Флаг для отслеживания первоначальной загрузки
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  isAuthenticated: false,
  initialLoad: true, // Изначально устанавливаем флаг в true

  login: async (email: string, password: string): Promise<void> => {
    const { setLoading } = useGlobalStore.getState();
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      showMessage('success', messages.auth.loginSuccess);
      await useAuthStore.getState().fetchUser();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error('Ошибка авторизации:', error);
      showMessage('error', translateError(errorMessage));
    } finally {
      setLoading(false);
    }
  },

  fetchUser: async () => {
    try {
      const user = await account.get();
      const isAdmin = user.labels?.includes('museum') || false;
      set({
        user: user,
        isAdmin: isAdmin,
        isAuthenticated: true,
      });
    } catch (error: unknown) {
      console.error('Пользователь не авторизован:', error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      // Показываем уведомление только если это не первоначальная загрузка
      if (!useAuthStore.getState().initialLoad) {
        showMessage('error', translateError(errorMessage));
      }
    } finally {
      // Сбрасываем флаг после завершения первоначальной загрузки
      set({ initialLoad: false });
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
