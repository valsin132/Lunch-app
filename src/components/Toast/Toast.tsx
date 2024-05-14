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
  autoCloseDuration?: number; // Optional prop to set custom duration
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

export function Toast({
  content,
  toastType,
  onClick,
  autoCloseDuration = 5000,
}: ToastProps): ReactElement {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClick(); // Call the provided onClick function when auto-closing
    }, autoCloseDuration);

    return () => clearTimeout(timer); // Cleanup function to clear the timer
  }, [autoCloseDuration, onClick]);

  if (!isVisible) return null; // Don't render the component if it's not visible

  return (
    <div className={cx('toast', `toast--color-${toastType}`)}>
      <div className={cx('toast__icon')}>{getIcon(toastType)}</div>
      <p className={cx('toast__text')}>{content}</p>
      <div className={cx('toast__close')}>
        <CloseIcon
          className={cx('toast__icon-close')}
          onClick={() => {
            setIsVisible(false);
            onClick(); // Ensure onClick is called when manually closing the toast
          }}
        />
      </div>
    </div>
  );
}
