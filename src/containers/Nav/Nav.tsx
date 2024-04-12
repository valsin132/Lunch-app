import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AUTH_PAGES_ROUTES, MAIN_PAGES } from '../../constants';

type NavProps = { children: ReactNode };
export function Nav({ children }: NavProps) {
  return (
    <>
      <nav style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
        <Link to={AUTH_PAGES_ROUTES.Login}>Login</Link>
        <Link to={AUTH_PAGES_ROUTES.Register}>Register</Link>
        <Link to={MAIN_PAGES.LunchMenu}>Lunch Menu</Link>
        <Link to={MAIN_PAGES.AvailableLunch}>Available Lunch</Link>
        <Link to={MAIN_PAGES.OrderHistory}>Order History</Link>
        <Link to={MAIN_PAGES.VendorLeaderboard}>Vendor Leaderboard</Link>
      </nav>
      <div>{children}</div>
    </>
  );
}
