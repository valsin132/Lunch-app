import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AUTH_PAGE_ROUTE, MAIN_PAGES_ROUTES } from './constants';
import { AvailableLunch } from './pages/AvailableLunch';
import { FoodMenu } from './pages/FoodMenu';
import { YourOrders } from './pages/YourOrders';
import { Ratings } from './pages/Ratings';
import { Auth } from './pages/Auth';
import { MainContent } from './containers/MainContent';
import { ProtectedRoute } from './containers/ProtectedRoute';
import { NotFoundPage } from './pages/NotFoundPage';
import { useAuth, AuthProvider } from './helpers/AuthContext';
import { FoodDataProvider } from './helpers/FoodDataContext';

function AppRoutes() {
  const { isLogged } = useAuth();
  return (
    <Routes>
      <Route element={<ProtectedRoute isLoggedIn={isLogged} pageType="auth" />}>
        <Route path="/" element={<Navigate to={AUTH_PAGE_ROUTE.Auth} />} />
        <Route path={AUTH_PAGE_ROUTE.Auth} element={<Auth />} />
      </Route>
      <Route element={<ProtectedRoute isLoggedIn={isLogged} pageType="main" />}>
        <Route element={<MainContent />}>
          <Route
            path={MAIN_PAGES_ROUTES.FoodMenu}
            element={
              <FoodDataProvider>
                <FoodMenu />
              </FoodDataProvider>
            }
          />
          <Route path={MAIN_PAGES_ROUTES.AvailableLunch} element={<AvailableLunch />} />
          <Route path={MAIN_PAGES_ROUTES.YourOrders} element={<YourOrders />} />
          <Route path={MAIN_PAGES_ROUTES.Ratings} element={<Ratings />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
