import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { OrderSummary } from '../../components/OrderSummary';

export function MainContent() {
  return (
    <>
      <Sidebar />
      <Outlet />
      <OrderSummary
        friday={[{ dishType: 'bowl', price: 5, title: 'Bowl', vendor: 'SOMI', mealId: 4 }]}
      />
    </>
  );
}
