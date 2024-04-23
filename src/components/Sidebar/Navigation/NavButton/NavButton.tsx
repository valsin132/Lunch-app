import classNames from 'classnames/bind';
import { ReactElement } from 'react';
import {
  GradingIcon,
  MenuIcon,
  RestaurantIcon,
  StartFilledCircleIcon,
} from '../../../../utils/iconManager';
import styles from './NavButton.module.css';

const cx = classNames.bind(styles);

type IconType = 'foodMenu' | 'yourOrder' | 'availableLunch' | 'ratings';

interface ButtonProps {
  title: string;
  iconType: IconType;
  isExpanded: boolean;
  isActive: boolean;
}
const getIcon = (iconType: IconType): ReactElement | null => {
  switch (iconType) {
    case 'yourOrder':
      return <GradingIcon />;
    case 'foodMenu':
      return <MenuIcon />;
    case 'availableLunch':
      return <RestaurantIcon />;
    case 'ratings':
      return <StartFilledCircleIcon />;
    default:
      return null;
  }
};

export function NavButton({ title, iconType, isExpanded, isActive }: ButtonProps): ReactElement {
  return (
    <button
      type="button"
      className={cx(
        'button',
        { 'button--expanded': isExpanded, 'button--collapsed': !isExpanded },
        {
          'button-selected--expanded': isActive && isExpanded,
          'button-selected--collapsed': isActive && !isExpanded,
        }
      )}>
      <div className={cx('button__icon')}>{getIcon(iconType)}</div>
      <p
        className={cx({
          'button__text--expanded': isExpanded,
          'button__text--collapsed': !isExpanded,
        })}>
        {title}
      </p>
    </button>
  );
}
