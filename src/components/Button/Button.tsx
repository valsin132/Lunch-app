import classNames from 'classnames/bind';
import { ReactElement } from 'react';
import { AddIcon, ArrowLongIcon } from '../../utils/iconManager';
import styles from './Button.module.css';

const cx = classNames.bind(styles);

type ButtonSize = 'md' | 'sm' | 'xs';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

type IconType = 'arrow' | 'plus';

type ButtonWidth = 'auto' | 'full';

interface ButtonProps {
  title: string;
  buttonSize: ButtonSize;
  buttonType: ButtonType;
  iconType?: IconType;
  buttonWidth?: ButtonWidth;
  onClick: () => void;
  isDisabled?: boolean;
}

export function Button({
  buttonSize,
  buttonType,
  title,
  buttonWidth = 'auto',
  isDisabled,
  iconType,
  onClick,
}: ButtonProps): ReactElement {
  return (
    <button
      disabled={isDisabled}
      type="button"
      className={cx(
        'button',
        [`button--size-${buttonSize}`],
        [`button--width-${buttonWidth}`],
        [`button--color-${buttonType}`],
        {
          'button--icon-left': iconType === 'plus',
          'button--icon-right': iconType === 'arrow',
        }
      )}
      onClick={onClick}>
      {iconType === 'plus' && <AddIcon className={cx('button__icon')} />}
      {title}
      {iconType === 'arrow' && (
        <ArrowLongIcon className={cx('button__icon', 'button__icon-arrow')} />
      )}
    </button>
  );
}
