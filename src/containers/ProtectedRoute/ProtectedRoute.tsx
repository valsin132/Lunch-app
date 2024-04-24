import { Navigate, Outlet } from 'react-router-dom';
import { AUTH_PAGE_ROUTE, MAIN_PAGES_ROUTES } from '../../constants';

type ProtectedRouteProps = {
  isLoggedIn: boolean;
  pageType: 'auth' | 'main';
};

export function ProtectedRoute({ isLoggedIn, pageType }: ProtectedRouteProps) {
  if (pageType === 'auth' && isLoggedIn) return <Navigate to={MAIN_PAGES_ROUTES.FoodMenu} />;
  if (pageType === 'main' && !isLoggedIn) return <Navigate to={AUTH_PAGE_ROUTE.Auth} />;
  return <Outlet />;
}
