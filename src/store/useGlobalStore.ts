import { create } from 'zustand';

interface GlobalState {
  isLoading: boolean;
  setLoading: (state: boolean) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  isLoading: false,
  setLoading: (state) => set({ isLoading: state }),
}));

export default useGlobalStore;
