import { ReactNode, createContext, useContext, useMemo, useReducer } from 'react';
import { DishType } from '../../components/FoodCard';

type OrderActions = 'REMOVE';

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

type OrderIdentifier = {
  day: Workdays;
  mealId: number;
  action: OrderActions;
};

type OrderSummaryContextType = {
  orders: Orders;
  modifyArray: (order: OrderIdentifier) => void;
};

const OrderSummaryContext = createContext<OrderSummaryContextType | null>(null);

function orderReducer(state: Orders, payload: OrderIdentifier): Orders {
  const { action } = payload;
  switch (action) {
    case 'REMOVE':
      return {
        ...state,
        [payload.day]: state[payload.day].filter((order) => order.mealId !== payload.mealId),
      };
    default:
      return state;
  }
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
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
};

export function OrderSummaryProvider({ children }: OrderSummaryProviderProps) {
  const [state, dispatch] = useReducer(orderReducer, initialVal);

  const orderSummaryValue = useMemo(() => ({ orders: state, modifyArray: dispatch }), [state]);

  return (
    <OrderSummaryContext.Provider value={orderSummaryValue}>
      {children}
    </OrderSummaryContext.Provider>
  );
}
