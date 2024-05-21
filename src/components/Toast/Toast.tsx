import { ReactElement, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import {
  CheckOutlinedIcon,
  CloseIcon,
  ErrorOutlinedIcon,
  InfoOutlinedIcon,
} from '../../utils/iconManager';
import styles from './Toast.module.css';

const cx = classNames.bind(styles);

type ToastTypes = 'info' | 'success' | 'warning';

interface ToastProps {
  content: string;
  toastType: ToastTypes;
  onClick: () => void;
}

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
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const startCloseTimeoutId = setTimeout(() => {
      setIsClosing(true);
    }, 2700);
    const closeTimeoutId = setTimeout(() => {
      onClick();
    }, 3000);
    return () => {
      clearTimeout(startCloseTimeoutId);
      clearTimeout(closeTimeoutId);
      setIsClosing(false);
    };
  }, [onClick]);

  return (
    <div className={cx('toast-container')}>
      <div
        className={cx('toast-container__toast', `toast-container__toast--color-${toastType}`, {
          'toast-container__toast--closing': isClosing,
        })}>
        <div className={cx('toast-container__icon')}>{getIcon(toastType)}</div>
        <p className={cx('toast-container__text')}>{content}</p>
        <div className={cx('toast-container__close')}>
          <CloseIcon className={cx('toast-container__icon-close')} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}
