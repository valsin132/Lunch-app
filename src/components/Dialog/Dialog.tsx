import classNames from 'classnames/bind';
import { ReactElement } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { CloseIcon } from '../../utils/iconManager';
import { okHandImage, thumbsUpImage, questionMarkImage } from '../../utils/imageManager';
// import { OkHandImage, ThumbsUpImage, QuestionMarkImage } from '../../utils/imageManager';
import styles from './Dialog.module.css';
// import React from 'react';
// import image from '../../assets/images/graphics/basket.png';
// import hey from '../../assets/images/graphics/basket.png'

const cx = classNames.bind(styles);

type DialogTypes = 'info' | 'success' | 'warning';

interface DialogProps {
  content: string;
  dialogType: DialogTypes;
  dialogHeaderText: string;
  dialogButtonTitle: string;
  weekday: string;
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
const getDialogHeaderText = (dialogHeaderText: string) => {
  switch (dialogHeaderText) {
    case 'success':
      return "We've got your lunch order!";
    case 'warning':
      return "You're about to cancel your order.";
    default:
      return dialogHeaderText;
  }
};
const getDialogButtonText = (dialogButtonTitle: string) => {
  switch (dialogButtonTitle) {
    case 'success':
      return 'Cool, Thanks!';
    case 'warning':
      return 'Yes, Cancel';
    default:
      return dialogButtonTitle;
  }
};
const getMessageContent = (dialogType: string, content: string) => {
  switch (dialogType) {
    case 'info':
      return content;
    case 'success':
      return 'Your order is placed successfully. You can view your lunch for the week in ';
    case 'warning':
      return 'Are you sure you want to cancel your order for ';
    default:
      return content;
  }
};

export function Dialog({
  content,
  dialogType,
  dialogHeaderText,
  dialogButtonTitle,
  weekday,
  onClick,
}: DialogProps): ReactElement {
  return (
    <div className={cx('dialog')}>
      <Card cardDialog>
        <div className={cx('dialog__structure')}>
          <div className={cx('dialog__header')}>
            <p>{getDialogHeaderText(dialogHeaderText)}</p>
            <button
              className={cx('dialog__close-icon')}
              onClick={onClick}
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
              <p>
                {getMessageContent(dialogType, content)}
                <strong
                  className={dialogType === 'success' ? '' : cx('dialog__content--successText')}>
                  Your Order.
                </strong>
                <span
                  className={dialogType === 'warning' ? '' : cx('dialog__content--warningText')}>
                  {weekday}
                </span>
              </p>
            </div>
          </div>
          <div className={cx('dialog__buttons')}>
            <Button
              buttonSize="md"
              buttonType="primary"
              title={getDialogButtonText(dialogButtonTitle)}
              onClick={onClick}
            />
            <div
              className={
                dialogButtonTitle === 'warning' ? '' : cx('dialog__buttons--second-button-off')
              }>
              <Button buttonSize="md" buttonType="secondary" title="No, Keep" onClick={onClick} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
