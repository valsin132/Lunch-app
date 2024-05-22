import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import {
  CheckOutlinedIcon,
  CloseIcon,
  ErrorOutlinedIcon,
  InfoOutlinedIcon,
} from '../../utils/iconManager';
import { useToastClosing } from './hooks/useToastClosing';
import { ToastProps, ToastTypes } from './Toast.types';
import styles from './Toast.module.css';

const cx = classNames.bind(styles);

const getIcon = (toastType: ToastTypes): ReactElement | null => {
  switch (toastType) {
    case 'info':
      return <InfoOutlinedIcon />;
    case 'success':
      return <CheckOutlinedIcon />;
    case 'warning':
      return <ErrorOutlinedIcon />;
    default:
      return null;
  }
};

export function Toast({ content, toastType, onClick }: ToastProps): ReactElement {
  const { isClosing } = useToastClosing(onClick);

  return (
    <div
      className={cx('toast', `toast--color-${toastType}`, {
        'toast--closing': isClosing,
      })}>
      <div className={cx('toast__icon')}>{getIcon(toastType)}</div>
      <p className={cx('toast__text')}>{content}</p>
      <div className={cx('toast__close')}>
        <CloseIcon className={cx('toast__icon-close')} onClick={onClick} />
      </div>
    </div>
  );
}
