import { ToastTypes } from '../../../../components/Toast/Toast.types';

export type AuthMenu = 'LOGIN' | 'REGISTER';
export type ToastState = {
  type: ToastTypes;
  message: string;
};
