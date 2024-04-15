import { Navigate, Outlet } from 'react-router-dom';

type ProtectedRouteProps = {
  isLoggedIn: boolean;
  fallbackPath: string;
};

export function ProtectedRoute({ isLoggedIn, fallbackPath }: ProtectedRouteProps) {
  if (!isLoggedIn) return <Navigate to={fallbackPath} replace />;
  return <Outlet />;
}
