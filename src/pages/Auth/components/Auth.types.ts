import { ToastTypes } from '../../../components/Toast/Toast.types';

export type ToastState = {
  type: ToastTypes;
  message: string;
};
