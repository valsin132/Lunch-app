import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AUTH_PAGES_ROUTES, MAIN_PAGES_ROUTES } from './constants';
import { ProtectedRoute } from './containers/ProtectedRoute';
import { AvailableLunch } from './pages/AvailableLunch';
import { FoodMenu } from './pages/FoodMenu';
import { YourOrders } from './pages/YourOrders';
import { Ratings } from './pages/Ratings';
import { MainContent } from './containers/MainContent';

export function App() {
  const isLoggedIn = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute fallbackPath={MAIN_PAGES_ROUTES.LunchMenu} isLoggedIn={!isLoggedIn} />
          }>
          <Route path="/" element={<Navigate to={AUTH_PAGES_ROUTES.Login} />} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/register" element={<div>Register</div>} />
        </Route>
        <Route
          element={
            <ProtectedRoute fallbackPath={AUTH_PAGES_ROUTES.Login} isLoggedIn={isLoggedIn} />
          }>
          <Route element={<MainContent />}>
            <Route path={MAIN_PAGES_ROUTES.LunchMenu} element={<FoodMenu />} />
            <Route path={MAIN_PAGES_ROUTES.AvailableLunch} element={<AvailableLunch />} />
            <Route path={MAIN_PAGES_ROUTES.OrderHistory} element={<YourOrders />} />
            <Route path={MAIN_PAGES_ROUTES.VendorLeaderboard} element={<Ratings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
