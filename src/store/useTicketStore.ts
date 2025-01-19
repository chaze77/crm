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
import { ITicket } from '@/types';
import messages from '@/constants/messages';

type TicketFilters = {
  museum_id?: string; // museum_id - строка
  name?: string; // name - строка
  cost?: number; // cost - число
  $id?: string; // $id - строка
};

interface TicketStore {
  tickets: ITicket[];
  ticket: ITicket | null;
  fetchTickets: (filters?: TicketFilters) => Promise<void>;
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

  fetchTickets: async (filters?: TicketFilters) => {
    try {
      const queryFilters: string[] = [];

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (key === 'name') {
            // Используем Query.search для фильтрации по name
            queryFilters.push(Query.contains(key, value as string));
          } else {
            queryFilters.push(Query.equal(key, [value as string]));
          }
        });
      }

      const documents = await fetchDocuments<ITicket>(
        DATABASE_ID,
        COLLECTION_ID,
        queryFilters
      );
      set({ tickets: documents });
    } catch (error) {
      console.error('Ошибка при загрузке билетов:', error);
    }
  },

  getById: async (id: string) => {
    try {
      const document = await getDocumentById<ITicket>(
        DATABASE_ID,
        COLLECTION_ID,
        id
      );
      set({ ticket: document });
    } catch (error) {
      console.error('Ошибка при получении билета:', error);
    }
  },
  resetCategory: () => set({ ticket: null }),

  create: async (formState: { name: string }) => {
    try {
      await createDocument(DATABASE_ID, COLLECTION_ID, { ...formState });
      const documents = await fetchDocuments<ITicket>(
        DATABASE_ID,
        COLLECTION_ID
      );
      set({ tickets: documents });
      showMessage('success', messages.general.createdSuccess);
    } catch (error) {
      console.error('Ошибка при создании категории:', error);
      showMessage('error', messages.general.unexpectedError);
    }
  },

  update: async (id: string, formState: { name: string }) => {
    try {
      await updateDocument(DATABASE_ID, COLLECTION_ID, id, { ...formState });
      const documents = await fetchDocuments<ITicket>(
        DATABASE_ID,
        COLLECTION_ID
      );
      set({ tickets: documents });
      showMessage('success', messages.general.updatedSuccess);
    } catch (error) {
      console.error('Ошибка при обновлении категории:', error);
      showMessage('error', messages.general.unexpectedError);
    }
  },

  delete: async (id: string) => {
    try {
      await deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      const documents = await fetchDocuments<ITicket>(
        DATABASE_ID,
        COLLECTION_ID
      );
      set({ tickets: documents });
      showMessage('success', messages.general.deletedSuccess);
    } catch (error) {
      console.error('Ошибка при удалении категории:', error);
      showMessage('error', messages.general.unexpectedError);
    }
  },
}));

export default useTicketStore;
