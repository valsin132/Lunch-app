import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AUTH_PAGES_ROUTES, MAIN_PAGES_ROUTES } from './constants';
import { AvailableLunch } from './pages/AvailableLunch';
import { FoodMenu } from './pages/FoodMenu';
import { YourOrders } from './pages/YourOrders';
import { Ratings } from './pages/Ratings';
import { MainContent } from './containers/MainContent';
import { ProtectedRoute } from './containers/ProtectedRoute';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute isLoggedIn pageType="auth" />}>
          <Route path="/" element={<Navigate to={AUTH_PAGES_ROUTES.Login} />} />
          <Route path="/login" element={<main>Login</main>} />
          <Route path="/register" element={<main>Register</main>} />
        </Route>
        <Route element={<ProtectedRoute isLoggedIn pageType="main" />}>
          <Route element={<MainContent />}>
            <Route path={MAIN_PAGES_ROUTES.FoodMenu} element={<FoodMenu />} />
            <Route path={MAIN_PAGES_ROUTES.AvailableLunch} element={<AvailableLunch />} />
            <Route path={MAIN_PAGES_ROUTES.YourOrders} element={<YourOrders />} />
            <Route path={MAIN_PAGES_ROUTES.Ratings} element={<Ratings />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
