import { ToastTypes } from '../../../components/Toast/Toast.types';

export type AuthToastState = {
  type: ToastTypes;
  message: string;
};
