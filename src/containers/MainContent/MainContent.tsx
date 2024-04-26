import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { OrderSummary } from '../../components/OrderSummary';
import { OrderSummaryProvider } from '../../helpers/OrderSummaryContext';

export function MainContent() {
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(true);
  const handleOrderSummaryHiding = () => {
    setIsOrderSummaryVisible(false);
  };
  return (
    <>
      <Sidebar />
      <Outlet />
      {isOrderSummaryVisible && (
        <OrderSummaryProvider>
          <OrderSummary visibilityHandler={handleOrderSummaryHiding} />
        </OrderSummaryProvider>
      )}
    </>
  );
}
