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

export type OrderDayType = {
  day: Workdays;
  orders: Order[];
};

export type Orders = OrderDayType[];

export type Workdays = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
const workdayToIndex: { [keyof in Workdays]: number } = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
};

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
    case 'REMOVE_ORDER': {
      if (!day || !mealId) {
        return state;
      }
      const dayIndex = state.findIndex((ordersForDay) => ordersForDay.day === day);
      if (dayIndex === -1) {
        return state;
      }
      const newState = [...state];
      newState[dayIndex].orders = newState[dayIndex].orders.filter(
        (order) => order.mealId !== mealId
      );
      if (newState[dayIndex].orders.length === 0) newState.splice(dayIndex, 1);
      return [...newState];
    }
    case 'ADD_ORDER': {
      if (!day || !meal) {
        return state;
      }

      const dayIndex = state.findIndex((ordersForDay) => ordersForDay.day === day);

      if (dayIndex === -1) {
        const newState = [...state, { day, orders: [meal] }].sort(
          (aOrderDay, bOrderDay) => workdayToIndex[aOrderDay.day] - workdayToIndex[bOrderDay.day]
        );

        return [...newState];
      }

      if (state[dayIndex].orders.some((order) => order.mealId === meal.mealId)) {
        return state;
      }

      const newState = [...state];
      newState[dayIndex] = {
        ...newState[dayIndex],
        orders: [...newState[dayIndex].orders, meal],
      };
      return [...newState];
    }
    case 'CLEAR_ORDERS':
      return [];
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

export function OrderSummaryProvider({ children }: OrderSummaryProviderProps) {
  const [state, dispatch] = useReducer(orderReducer, []);

  const orderSummaryValue = useMemo(() => ({ orders: state, modifyOrders: dispatch }), [state]);
  return (
    <OrderSummaryContext.Provider value={orderSummaryValue}>
      {children}
    </OrderSummaryContext.Provider>
  );
}
