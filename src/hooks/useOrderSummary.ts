import { useContext } from 'react';
import { OrderSummaryContext, OrderSummaryContextType } from '../helpers/OrderSummaryContext';

export const useOrderSummary = (): OrderSummaryContextType => {
  const context = useContext(OrderSummaryContext);
  if (!context) {
    throw new Error('useOrderSummary must be used within an OrderSummary provider');
  }
  return context;
};
