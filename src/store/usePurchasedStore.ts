import { create } from 'zustand';
import { fetchDocuments } from '@/utils/api';
import { Query } from 'appwrite';
import { IPurchased } from '@/types';

type PurchasedFilters = {
  user_email?: string; // museum_id - строка
  status?: string; // name - строка
  price?: number; // cost - число
};

type PurchasedState = {
  purchases: IPurchased[] | null;
  fetchPurchases: (filters?: { user?: string }) => Promise<void>;
};

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_PURCHASE_COLLECTION_ID;

const usePurchasedStore = create<PurchasedState>((set) => ({
  purchases: null,

  fetchPurchases: async (filters?: PurchasedFilters) => {
    try {
      const queryFilters: string[] = []; // Массив для фильтров

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (key === 'user_email') {
            // Фильтрация по email (строка)
            queryFilters.push(Query.contains(key, value as string));
          } else if (key === 'price') {
            // Фильтрация по цене (число)
            queryFilters.push(Query.equal(key, [value as number]));
          } else if (key === 'status') {
            // Фильтрация по статусу (строка)
            queryFilters.push(Query.equal(key, [value as string]));
          }
        });
      }

      // Запрашиваем документы с учетом фильтров
      const documents = await fetchDocuments<IPurchased>(
        DATABASE_ID,
        COLLECTION_ID,
        queryFilters
      );

      // Сохраняем результаты в состоянии
      set({ purchases: documents });
    } catch (error) {
      console.error('Ошибка при загрузке покупок:', error);
    }
  },
}));

export default usePurchasedStore;
