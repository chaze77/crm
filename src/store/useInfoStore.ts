import { create } from 'zustand';
import { fetchDocuments, updateDocument } from '@/utils/api';
import { Query } from 'appwrite';
import showMessage from '@/hooks/useNotify';
import { IInfo } from '@/types';
import messages from '@/constants/messages';

type InfoState = {
  info: IInfo[] | null;
  fetchInfo: (filters?: { user?: string }) => Promise<void>;
  update: (id: string, formState: { name: string }) => Promise<void>;
};

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_MUSEUMS_COLLECTION_ID;

const useInfoStore = create<InfoState>((set) => ({
  info: null,

  fetchInfo: async (filters?: { user?: string }) => {
    try {
      const queryFilters: string[] = [];
      if (filters?.user) {
        queryFilters.push(Query.equal('$id', [filters.user]));
      }
      const documents = await fetchDocuments<IInfo>(
        DATABASE_ID,
        COLLECTION_ID,
        queryFilters
      );
      set({ info: documents });
    } catch (error) {
      console.error('Ошибка при загрузке инфо:', error);
    }
  },
  update: async (id: string, formState: { name: string }) => {
    try {
      await updateDocument(DATABASE_ID, COLLECTION_ID, id, { ...formState });
      showMessage('success', messages.general.updatedSuccess);
    } catch (error) {
      console.error('Ошибка при обновлении инфо:', error);
      showMessage('error', messages.general.unexpectedError);
    }
  },
}));

export default useInfoStore;
