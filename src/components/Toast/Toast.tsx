import { ReactElement, useRef } from 'react';
import classNames from 'classnames/bind';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import {
  CheckOutlinedIcon,
  CloseIcon,
  ErrorOutlinedIcon,
  InfoOutlinedIcon,
} from '../../utils/iconManager';
import { ToastProps, ToastTypes } from './Toast.types';
import { useToastClosing } from './hooks/useToastClosing';
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

const toastCubicBezier = cubicBezier(0.06, 0.14, 0.49, 1.6);

export function Toast({ isVisible, content, toastType, onClick }: ToastProps): ReactElement {
  const toastRef = useRef<HTMLDivElement | null>(null);
  useToastClosing(onClick);

  const handleAnimationComplete = () => {
    if (toastRef.current) {
      toastRef.current.focus();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cx('toast', `toast--color-${toastType}`)}
          initial={{ y: 'calc(-100% - 24px)', x: '-50%' }}
          animate={{ y: 0, x: '-50%' }}
          exit={{ y: 'calc(-100% - 24px)', transition: { easings: toastCubicBezier } }}
          onAnimationComplete={handleAnimationComplete}
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
          ref={toastRef}>
          <div className={cx('toast__icon')}>{getIcon(toastType)}</div>
          <p className={cx('toast__text')}>{content}</p>
          <button className={cx('toast__close')} type="button" aria-label="Close" onClick={onClick}>
            <CloseIcon className={cx('toast__icon-close')} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
