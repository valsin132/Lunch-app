import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { MAIN_PAGES_ROUTES } from '../../../constants';
import {
  GradingIcon,
  MenuIcon,
  RestaurantIcon,
  StartFilledCircleIcon,
} from '../../../utils/iconManager';
import styles from './Navigation.module.css';

const cx = classNames.bind(styles);

interface NavProps {
  isExpanded: boolean;
}

interface NavigationItem {
  title: string;
  iconType: IconType;
  route: string;
}

type IconType = 'foodMenu' | 'yourOrder' | 'availableLunch' | 'ratings';

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
const navigationItems: NavigationItem[] = [
  { title: 'Food Menu', iconType: 'foodMenu', route: MAIN_PAGES_ROUTES.FoodMenu },
  {
    title: 'Available Lunch',
    iconType: 'availableLunch',
    route: MAIN_PAGES_ROUTES.AvailableLunch,
  },
  { title: 'Your Orders', iconType: 'yourOrder', route: MAIN_PAGES_ROUTES.YourOrders },
  { title: 'Ratings', iconType: 'ratings', route: MAIN_PAGES_ROUTES.Ratings },
];
export function Navigation({ isExpanded }: NavProps): ReactElement {
  return (
    <nav className={cx('navigation')}>
      <ul role="menubar">
        {Object.entries(navigationItems).map(([key, { title, iconType, route }]) => (
          <li key={key} role="menuitem">
            <NavLink to={route}>
              {({ isActive }) => (
                <div
                  className={cx(
                    'navigation-list-item',
                    { 'navigation-list-item--collapsed': !isExpanded },
                    {
                      'navigation-list-item-selected': isActive,
                      'navigation-list-item-selected--collapsed': isActive && !isExpanded,
                    }
                  )}>
                  <div className={cx('navigation-list-item__icon')}>{getIcon(iconType)}</div>
                  <p
                    className={cx('navigation-list-item__text', {
                      'navigation-list-item__text--collapsed': !isExpanded,
                    })}>
                    {title}
                  </p>
                </div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
