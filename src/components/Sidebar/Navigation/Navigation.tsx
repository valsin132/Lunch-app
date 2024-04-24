import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { MAIN_PAGES_ROUTES } from '../../../constants';
import { NavButton } from './NavButton';
import styles from './Navigation.module.css';

const cx = classNames.bind(styles);

interface NavProps {
  isExpanded: boolean;
}
export function Navigation({ isExpanded }: NavProps): ReactElement {
  type IconType = 'foodMenu' | 'yourOrder' | 'availableLunch' | 'ratings';
  interface NavigationItem {
    title: string;
    iconType: IconType;
    route: string;
  }
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
  return (
    <ul className={cx('ul-list')}>
      {Object.entries(navigationItems).map(([key, { title, iconType, route }]) => (
        <li key={key}>
          <NavLink to={route}>
            {({ isActive }) => (
              <NavButton
                isActive={isActive}
                isExpanded={isExpanded}
                title={title}
                iconType={iconType}
              />
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
