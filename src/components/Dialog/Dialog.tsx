import classNames from 'classnames/bind';
import { ReactElement, ReactNode } from 'react';
import { okHandImage, thumbsUpImage, questionMarkImage } from '../../utils/imageManager';
import { Modal } from '../Modal';
import styles from './Dialog.module.css';

const cx = classNames.bind(styles);

type DialogTypes = 'info' | 'success' | 'warning';

interface DialogProps {
  dialogType: DialogTypes;
  dialogHeaderTitle: string;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  children: ReactNode;
  setIsOpen: (isOpen: boolean) => void;
  onClick: () => void;
}

const getSupportingIllustration = (dialogType: DialogTypes): string => {
  switch (dialogType) {
    case 'info':
      return okHandImage;
    case 'success':
      return thumbsUpImage;
    case 'warning':
      return questionMarkImage;
    default:
      return dialogType;
  }
};

export function Dialog({
  dialogType,
  dialogHeaderTitle,
  primaryButtonLabel,
  secondaryButtonLabel,
  onClick,
  setIsOpen,
  children,
}: DialogProps): ReactElement {
  return (
    <div className={cx('dialog')}>
      <Modal
        title={dialogHeaderTitle}
        primaryButtonLabel={primaryButtonLabel}
        secondaryButtonLabel={secondaryButtonLabel}
        modalSize="xs"
        gap="xl"
        onClick={onClick}
        setIsOpenModal={setIsOpen}>
        <div className={cx('dialog__picture-and-content')}>
          <div className={cx('dialog__img-container')}>
            <img
              className={cx({ 'dialog__img-too-big': dialogType !== 'warning' })}
              src={getSupportingIllustration(dialogType)}
              alt="Dialog icon"
            />
          </div>
          <div className={cx('dialog__content')}>{children}</div>
        </div>
      </Modal>
    </div>
  );
}
