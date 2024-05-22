export type ToastTypes = 'info' | 'success' | 'warning';

export interface ToastProps {
  content: string;
  toastType: ToastTypes;
  onClick: () => void;
}
