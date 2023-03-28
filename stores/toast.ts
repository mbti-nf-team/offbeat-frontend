import { create } from 'zustand';

export type ToastStore = {
  message: string;
  type: 'error' | 'info' | 'success';
  isRender: boolean;
  renderToast: (message: string) => void;
  closeToast: () => void;
};

const useToastStore = create<ToastStore>((set) => ({
  message: '',
  isRender: false,
  type: 'success',
  renderToast: (message) => set((state) => ({ ...state, isRender: true, message })),
  closeToast: () => set((state) => ({ ...state, isRender: false })),
}));

export default useToastStore;
