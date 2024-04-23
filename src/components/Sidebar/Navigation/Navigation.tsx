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
  return (
    <ul className={cx('ul-list')}>
      <li>
        <NavLink to={MAIN_PAGES_ROUTES.FoodMenu}>
          {({ isActive }) => (
            <NavButton
              isActive={isActive}
              isExpanded={isExpanded}
              title="Food Menu"
              iconType="foodMenu"
            />
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to={MAIN_PAGES_ROUTES.AvailableLunch}>
          {({ isActive }) => (
            <NavButton
              isActive={isActive}
              isExpanded={isExpanded}
              title="Available Lunch"
              iconType="availableLunch"
            />
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to={MAIN_PAGES_ROUTES.YourOrders}>
          {({ isActive }) => (
            <NavButton
              isActive={isActive}
              isExpanded={isExpanded}
              title="Your Orders"
              iconType="yourOrder"
            />
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to={MAIN_PAGES_ROUTES.Ratings}>
          {({ isActive }) => (
            <NavButton
              isActive={isActive}
              isExpanded={isExpanded}
              title="Ratings"
              iconType="ratings"
            />
          )}
        </NavLink>
      </li>
    </ul>
  );
}
