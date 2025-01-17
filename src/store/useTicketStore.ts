import { create } from 'zustand';
import { Query } from 'appwrite';
import {
  createDocument,
  deleteDocument,
  fetchDocuments,
  getDocumentById,
  updateDocument,
} from '@/utils/api';
import showMessage from '@/hooks/useNotify';
// import useGlobalStore from './useGlobalStore';

interface TicketStore {
  tickets: any[];
  ticket: any | null;
  fetchTickets: (filters?: { museum_id?: string }) => Promise<void>;
  getById: (id: string) => Promise<void>;
  resetCategory: () => void;
  create: (formState: { name: string }) => Promise<void>;
  update: (id: string, formState: { name: string }) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_TICKETS_COLLECTION_ID;

const useTicketStore = create<TicketStore>((set) => ({
  tickets: [],
  ticket: null,

  fetchTickets: async (filters?: { museum_id?: string }) => {
    // const { setLoading } = useGlobalStore.getState();
    // setLoading(true);
    try {
      const queryFilters: string[] = [];
      if (filters?.museum_id) {
        queryFilters.push(Query.equal('museum_id', [filters.museum_id]));
      }
      const documents = await fetchDocuments<any>(
        DATABASE_ID,
        COLLECTION_ID,
        queryFilters
      );
      set({ tickets: documents });
    } catch (error) {
      console.error('Ошибка при загрузке билетов:', error);
    } finally {
      //   setLoading(false);
    }
  },

  getById: async (id: string) => {
    // const { setLoading } = useGlobalStore.getState();
    // setLoading(true);
    try {
      const document = await getDocumentById<any>(
        DATABASE_ID,
        COLLECTION_ID,
        id
      );
      set({ ticket: document });
    } catch (error) {
      console.error('Ошибка при получении билета:', error);
    } finally {
      //   setLoading(false);
    }
  },
  resetCategory: () => set({ ticket: null }),

  create: async (formState: { name: string }) => {
    try {
      await createDocument(DATABASE_ID, COLLECTION_ID, { ...formState });
      const documents = await fetchDocuments<any>(DATABASE_ID, COLLECTION_ID);
      set({ tickets: documents });
      showMessage('success', 'Category successfully created');
    } catch (error) {
      console.error('Ошибка при создании категории:', error);
      showMessage('error', 'Failed to create category');
    }
  },

  update: async (id: string, formState: { name: string }) => {
    try {
      await updateDocument(DATABASE_ID, COLLECTION_ID, id, { ...formState });
      const documents = await fetchDocuments<any>(DATABASE_ID, COLLECTION_ID);
      set({ tickets: documents });
      showMessage('success', 'Category successfully updated');
    } catch (error) {
      console.error('Ошибка при обновлении категории:', error);
      showMessage('error', 'Failed to update category');
    }
  },

  delete: async (id: string) => {
    try {
      await deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      const documents = await fetchDocuments<any>(DATABASE_ID, COLLECTION_ID);
      set({ tickets: documents });
      showMessage('success', 'Category successfully deleted');
    } catch (error) {
      console.error('Ошибка при удалении категории:', error);
      showMessage('error', 'Failed to delete category');
    }
  },
}));

export default useTicketStore;
