import { ReactElement, ReactNode } from 'react';
import classNames from 'classnames/bind';
import { Card } from '../Card';
import { Button } from '../Button';
import { CloseIcon } from '../../utils/iconManager';
import styles from './Modal.module.css';

const cx = classNames.bind(styles);

interface ModalProps {
  children: ReactNode;
  header?: boolean;
  title: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  setIsOpenModal: (isOpenModal: boolean) => void;
  onClick: () => void;
}

export function Modal({
  children,
  header,
  title,
  primaryButtonLabel,
  secondaryButtonLabel,
  onClick,
  setIsOpenModal,
}: ModalProps): ReactElement {
  return (
    <div className={cx('modal-overlay')}>
      <div className={cx('modal')}>
        <Card isNoBorder>
          {header && (
            <div className={cx('modal__header')}>
              <p>{title}</p>
              <div className={cx('modal__close')}>
                <CloseIcon
                  className={cx('modal__close-icon')}
                  onClick={() => setIsOpenModal(false)}
                />
              </div>
            </div>
          )}
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
        </Card>
      </div>
    </div>
  );
}
