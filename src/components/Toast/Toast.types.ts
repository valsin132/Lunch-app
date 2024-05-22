export type ToastTypes = 'info' | 'success' | 'warning';

export interface ToastProps {
  isVisible: boolean;
  content: string;
  toastType: ToastTypes;
  onClick: () => void;
}
