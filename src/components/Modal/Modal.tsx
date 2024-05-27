import { ReactElement, ReactNode, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { Card } from '../Card';
import { Button } from '../Button';
import { CloseIcon } from '../../utils/iconManager';
import styles from './Modal.module.css';

const cx = classNames.bind(styles);

type ModalSize = 'md' | 'sm' | 'xs';

interface ModalProps {
  children: ReactNode;
  title: string;
  modalSize: ModalSize;
  isSmallerUpperGap?: boolean;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  setIsOpenModal: (isOpenModal: boolean) => void;
  onClick: () => void;
  isDisabled?: boolean;
}

export function Modal({
  children,
  title,
  modalSize,
  isSmallerUpperGap,
  primaryButtonLabel,
  secondaryButtonLabel,
  onClick,
  setIsOpenModal,
  isDisabled,
}: ModalProps): ReactElement {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpenModal(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsOpenModal]);

  return (
    <div
      className={cx('modal-overlay')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}>
      <Card isNoBorder>
        <div className={cx('modal__wrapper', [`modal__wrapper--size-${modalSize}`])}>
          <div
            className={cx('modal__header-wrapper', {
              'modal__header-wrapper--gap-smaller': isSmallerUpperGap,
            })}>
            <div className={cx('modal__header')}>
              <p id="modal-title">{title}</p>
              <div className={cx('modal__close')}>
                <button
                  onClick={() => setIsOpenModal(false)}
                  aria-label="Close"
                  type="button"
                  ref={closeButtonRef}>
                  <CloseIcon />
                </button>
              </div>
            </div>
            {children}
          </div>
          <div className={cx('modal__buttons')}>
            {primaryButtonLabel && (
              <Button
                aria-label="Add to cart"
                buttonSize="md"
                buttonType="primary"
                title={primaryButtonLabel}
                onClick={onClick}
                isDisabled={isDisabled}
              />
            )}
            {secondaryButtonLabel && (
              <Button
                aria-label="Close"
                buttonSize="md"
                buttonType="secondary"
                title={secondaryButtonLabel}
                onClick={() => setIsOpenModal(false)}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
