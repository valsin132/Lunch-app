import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { OrderSummary } from '../../components/OrderSummary';
import { OrderSummaryProvider } from '../../helpers/OrderSummaryContext';
import { UserCard } from '../../components/UserCard';

export function MainContent() {
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(true);

  return (
    <>
      <Sidebar />
      <OrderSummaryProvider>
        <Outlet />
        {isOrderSummaryVisible && (
          <OrderSummary
            visibilityHandler={() => {
              setIsOrderSummaryVisible(false);
            }}
          />
        )}
        <header>
          <UserCard toggleOrderSummary={() => alert('close order summary')} />
        </header>
      </OrderSummaryProvider>
    </>
  );
}
