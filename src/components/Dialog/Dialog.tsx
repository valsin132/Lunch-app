import classNames from 'classnames/bind';
import { ReactElement } from 'react';
import { okHandImage, thumbsUpImage, questionMarkImage } from '../../utils/imageManager';
import { Modal } from '../Modal';
import styles from './Dialog.module.css';

const cx = classNames.bind(styles);

type DialogTypes = 'info' | 'success' | 'warning';

interface DialogProps {
  content: string;
  dialogType: DialogTypes;
  dialogHeaderTitle: string;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
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
  content,
  dialogType,
  dialogHeaderTitle,
  primaryButtonLabel,
  secondaryButtonLabel,
  onClick,
  setIsOpen,
}: DialogProps): ReactElement {
  return (
    <div className={cx('dialog')}>
      <Modal
        title={dialogHeaderTitle}
        primaryButtonLabel={primaryButtonLabel}
        secondaryButtonLabel={secondaryButtonLabel}
        modalSize="xs"
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
          <div className={cx('dialog__content')}>
            <p>{content}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
