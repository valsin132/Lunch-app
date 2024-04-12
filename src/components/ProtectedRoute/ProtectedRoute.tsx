import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH_PAGES_ROUTES } from '../../constants';

type ProtectedRouteProps = {
  children: ReactNode;
  isLoggedIn: boolean;
};

export function ProtectedRoute({ children, isLoggedIn }: ProtectedRouteProps) {
  if (!isLoggedIn) return <Navigate to={AUTH_PAGES_ROUTES.Login} />;

  return children;
}
