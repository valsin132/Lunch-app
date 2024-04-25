import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { OrderSummary } from '../../components/OrderSummary';

export function MainContent() {
  return (
    <>
      <Sidebar />
      <Outlet />
      <OrderSummary
        monday={[
          { dishType: 'bowl', price: 5, title: 'Bowl', vendor: 'SOMI', mealId: 4 },
          { dishType: 'burger', price: 5, title: 'Bowlie', vendor: 'SOMI', mealId: 5 },
          { dishType: 'pizza', price: 5, title: 'Bowlie', vendor: 'SOMI', mealId: 0 },
        ]}
        friday={[
          { dishType: 'sandwich', price: 5, title: 'Bowlie', vendor: 'SOMI', mealId: 1 },
          { dishType: 'soup', price: 5, title: 'Bowlie', vendor: 'SOMI', mealId: 2 },
        ]}
        wednesday={[
          { dishType: 'soup', price: 5, title: 'Bowlie', vendor: 'SOMI', mealId: 8 },
          { dishType: 'soup', price: 5, title: 'Bowlie', vendor: 'SOMI', mealId: 7 },
          { dishType: 'soup', price: 5, title: 'Bowlie', vendor: 'SOMI', mealId: 6 },
        ]}
      />
    </>
  );
}
