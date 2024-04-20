import classNames from 'classnames/bind';
import { ReactElement } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { CloseIcon } from '../../utils/iconManager';
import { okHandImage, thumbsUpImage, questionMarkImage } from '../../utils/imageManager';
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
      <Card isNoBorder>
        <div className={cx('dialog__structure')}>
          <div className={cx('dialog__header')}>
            <p>{dialogHeaderTitle}</p>
            <button
              className={cx('dialog__close-icon')}
              onClick={() => setIsOpen(false)}
              type="button"
              aria-label="Close dialog">
              <CloseIcon />
            </button>
          </div>
          <div className={cx('dialog__picture-and-content')}>
            <div className={cx('dialog__img-container')}>
              <img
                className={dialogType === 'warning' ? '' : cx('dialog__img-too-big')}
                src={getSupportingIllustration(dialogType)}
                alt="Dialog icon"
              />
            </div>
            <div className={cx('dialog__content')}>
              <p>{content}</p>
            </div>
          </div>
          <div className={cx('dialog__buttons')}>
            <Button
              buttonSize="md"
              buttonType="primary"
              title={primaryButtonLabel}
              onClick={onClick}
            />
            {secondaryButtonLabel && (
              <Button
                buttonSize="md"
                buttonType="secondary"
                title={secondaryButtonLabel}
                onClick={() => setIsOpen(false)}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
