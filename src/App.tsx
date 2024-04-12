import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react';
import { MAIN_PAGES, AUTH_PAGES_ROUTES } from './constants';
import { AvailableOrders } from './pages/AvailableOrders';
import { Loading } from './pages/Loading';
import { LunchMenu } from './pages/LunchMenu';
import { OrderHistory } from './pages/OrderHistory';
import { VendorLeaderboard } from './pages/VendorLeaderboard';
import { MainContent } from './containers/MainContent';
import { Nav } from './containers/Nav';

export function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Nav>
          <Routes>
            <Route path="/" element={<Loading />} />
            <Route path={AUTH_PAGES_ROUTES.Login} element={<div>Login Page</div>} />
            <Route path={AUTH_PAGES_ROUTES.Register} element={<div>Register page</div>} />
            <Route element={<MainContent />}>
              <Route path={MAIN_PAGES.LunchMenu} element={<LunchMenu />} />
              <Route path={MAIN_PAGES.AvailableLunch} element={<AvailableOrders />} />
              <Route path={MAIN_PAGES.OrderHistory} element={<OrderHistory />} />
              <Route path={MAIN_PAGES.VendorLeaderboard} element={<VendorLeaderboard />} />
            </Route>
          </Routes>
        </Nav>
      </BrowserRouter>
    </StrictMode>
  );
}
