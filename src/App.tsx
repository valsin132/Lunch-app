import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AUTH_PAGES_ROUTES, MAIN_PAGES_ROUTES } from './constants';
import { ProtectedRoute } from './containers/ProtectedRoute';
import { AvailableLunch } from './pages/AvailableLunch';
import { FoodMenu } from './pages/FoodMenu';
import { YourOrders } from './pages/YourOrders';
import { Ratings } from './pages/Ratings';
import { MainContent } from './containers/MainContent';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          element={<ProtectedRoute fallbackPath={MAIN_PAGES_ROUTES.FoodMenu} isLoggedIn={false} />}>
          <Route path="/" element={<Navigate to={AUTH_PAGES_ROUTES.Login} />} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/register" element={<div>Register</div>} />
        </Route>
        <Route
          element={<ProtectedRoute fallbackPath={AUTH_PAGES_ROUTES.Login} isLoggedIn={false} />}>
          <Route element={<MainContent />}>
            <Route path={MAIN_PAGES_ROUTES.FoodMenu} element={<FoodMenu />} />
            <Route path={MAIN_PAGES_ROUTES.AvailableLunch} element={<AvailableLunch />} />
            <Route path={MAIN_PAGES_ROUTES.YourOrders} element={<YourOrders />} />
            <Route path={MAIN_PAGES_ROUTES.Ratings} element={<Ratings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
