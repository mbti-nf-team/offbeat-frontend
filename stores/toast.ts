import { create } from 'zustand';

type ToastType = 'error' | 'info' | 'success';

export type ToastStore = {
  message: string;
  type: ToastType;
  isRender: boolean;
  delay: number;
  renderToast: (
    message: string, toastOption?: { type?: ToastType; delay?: number }
  ) => void;
  closeToast: () => void;
};

const useToastStore = create<ToastStore>((set) => ({
  message: '',
  delay: 0,
  isRender: false,
  type: 'success',
  renderToast: (message, { delay = 3000, type = 'info' } = {}) => set((state) => ({
    ...state, isRender: true, message, delay, type,
  })),
  closeToast: () => set((state) => ({ ...state, isRender: false })),
}));

export default useToastStore;
