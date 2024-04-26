import { ReactNode, createContext, useContext, useMemo, useReducer } from 'react';
import { DishType } from '../../components/FoodCard';

export type Order = {
  dishType: DishType;
  vendor: string;
  title: string;
  price: number;
  mealId: number;
};

export type Orders = {
  monday: Order[];
  tuesday: Order[];
  wednesday: Order[];
  thursday: Order[];
  friday: Order[];
};

export type Workdays = keyof Orders;

interface OrderIdentifier {
  day: Workdays;
  mealId: number;
}

interface OrderSummaryContextType {
  orders: Orders;
  removeElement: (order: OrderIdentifier) => void;
}

const OrderSummaryContext = createContext<OrderSummaryContextType | null>(null);

function orderReducer(state: Orders, payload: OrderIdentifier): Orders {
  const filteredState = state[payload.day].filter((order) => order.mealId !== payload.mealId);
  return {
    ...state,
    [payload.day]: filteredState,
  };
}

export const useOrderSummary = (): OrderSummaryContextType => {
  const context = useContext(OrderSummaryContext);
  if (!context) {
    throw new Error('useOrderSummary must be used within an OrderSummary provider');
  }
  return context;
};

type OrderSummaryProviderProps = {
  children: ReactNode;
};

const initialVal: Orders = {
  monday: [{ dishType: 'bowl', mealId: 1, price: 4, title: 'Kuku', vendor: 'SOmi' }],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
};

export function OrderSummaryProvider({ children }: OrderSummaryProviderProps) {
  const [state, dispatch] = useReducer(orderReducer, initialVal);

  const orderSummaryValue = useMemo(() => ({ orders: state, removeElement: dispatch }), [state]);

  return (
    <OrderSummaryContext.Provider value={orderSummaryValue}>
      {children}
    </OrderSummaryContext.Provider>
  );
}
