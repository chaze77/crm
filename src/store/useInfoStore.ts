import { create } from 'zustand';
import { fetchDocuments, updateDocument } from '@/utils/api';
import { Query } from 'appwrite';
import showMessage from '@/hooks/useNotify';

type InfoState = {
  info: any | null;
  fetchInfo: () => Promise<void>;
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
        console.log(filters, 'filters');

        queryFilters.push(Query.equal('$id', [filters.user]));
      }
      const documents = await fetchDocuments<any>(
        DATABASE_ID,
        COLLECTION_ID,
        queryFilters
      );
      set({ info: documents });
    } catch (error) {
      console.error('Ошибка при загрузке подкатегорий:', error);
    }
  },
  update: async (id: string, formState: { name: string }) => {
    try {
      await updateDocument(DATABASE_ID, COLLECTION_ID, id, { ...formState });
      //   const documents = await fetchDocuments<any>(DATABASE_ID, COLLECTION_ID);
      //   set({ info: documents });
      showMessage('success', 'successfully updated');
    } catch (error) {
      console.error('Ошибка при обновлении категории:', error);
      showMessage('error', 'Failed to update category');
    }
  },
}));
export default useInfoStore;
