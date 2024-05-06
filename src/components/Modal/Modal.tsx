import { ReactElement, ReactNode } from 'react';
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
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  setIsOpenModal: (isOpenModal: boolean) => void;
  onClick: () => void;
}

export function Modal({
  children,
  title,
  modalSize,
  primaryButtonLabel,
  secondaryButtonLabel,
  onClick,
  setIsOpenModal,
}: ModalProps): ReactElement {
  return (
    <div className={cx('modal-overlay')}>
      <Card isNoBorder>
        <div className={cx('modal__wrapper', [`modal__wrapper--size-${modalSize}`])}>
          <div className={cx('modal__header')}>
            <p>{title}</p>
            <div className={cx('modal__close')}>
              <CloseIcon
                onClick={() => {
                  setIsOpenModal(false);
                }}
              />
            </div>
          </div>
          {children}
          <div className={cx('modal__buttons')}>
            {primaryButtonLabel && (
              <Button
                buttonSize="md"
                buttonType="primary"
                title={primaryButtonLabel}
                onClick={onClick}
              />
            )}
            {secondaryButtonLabel && (
              <Button
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
