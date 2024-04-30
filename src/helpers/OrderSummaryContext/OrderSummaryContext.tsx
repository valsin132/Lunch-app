import { ReactNode, createContext, useContext, useMemo, useReducer } from 'react';
import { DishType } from '../../components/FoodCard';

type OrderActions = 'REMOVE_ORDER' | 'ADD_ORDER' | 'CLEAR_ORDERS';

export type Order = {
  dishType: DishType;
  vendor: string;
  title: string;
  price: number;
  mealId: number;
};

export type Orders = {
  monday?: Order[];
  tuesday?: Order[];
  wednesday?: Order[];
  thursday?: Order[];
  friday?: Order[];
};

export type Workdays = keyof Orders;

type OrderIdentifier = {
  action: OrderActions;
  day?: Workdays;
  mealId?: number;
  meal?: Order;
};

type OrderSummaryContextType = {
  orders: Orders;
  modifyOrders: (order: OrderIdentifier) => void;
};

const OrderSummaryContext = createContext<OrderSummaryContextType | null>(null);

function orderReducer(state: Orders, payload: OrderIdentifier): Orders {
  const { action, day, meal, mealId } = payload;
  switch (action) {
    case 'REMOVE_ORDER':
      if (!day) {
        return state;
      }
      if (!state[day] && !mealId) {
        return state;
      }
      return {
        ...state,
        [day]: state[day]?.filter((order) => order.mealId !== mealId),
      };
    case 'ADD_ORDER': {
      if (!meal) {
        return state;
      }
      if (!day) {
        return state;
      }
      if (state[day] === undefined) {
        return {
          ...state,
          [day]: [meal],
        };
      }

      return {
        ...state,
        [day]: [...(state[day] as Order[]), meal],
      };
    }
    case 'CLEAR_ORDERS':
      return {};
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

const initialVal: Orders = {};

export function OrderSummaryProvider({ children }: OrderSummaryProviderProps) {
  const [state, dispatch] = useReducer(orderReducer, initialVal);

  const orderSummaryValue = useMemo(() => ({ orders: state, modifyOrders: dispatch }), [state]);

  return (
    <OrderSummaryContext.Provider value={orderSummaryValue}>
      {children}
    </OrderSummaryContext.Provider>
  );
}
