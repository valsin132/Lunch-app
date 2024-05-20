import { ReactElement } from 'react';
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
  return (
    <div className={cx('toast', `toast--color-${toastType}`)} role="alert">
      <div className={cx('toast__icon')}>{getIcon(toastType)}</div>
      <p className={cx('toast__text')}>{content}</p>
      <div className={cx('toast__close')}>
        <CloseIcon className={cx('toast__icon-close')} onClick={onClick} />
      </div>
    </div>
  );
}
