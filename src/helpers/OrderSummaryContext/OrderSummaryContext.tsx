import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { MealType } from '../../pages/FoodMenu/FoodMenu.types';
import { DishType } from '../../components/FoodCard/FoodCard.types';

type OrderActions = 'REMOVE_ORDER' | 'ADD_ORDER' | 'CLEAR_ORDERS';

export type Order = {
  dishType: DishType;
  vendor: string;
  title: string;
  price: number;
  mealId: number;
  mealType: MealType;
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

export type OrderSummaryContextType = {
  orders: Orders;
  modifyOrders: (order: OrderIdentifier) => void;
};

export const OrderSummaryContext = createContext<OrderSummaryContextType | null>(null);

const orderSummaryEventName = 'ordersummarystorage';

const getOrderSummaryItems = () => {
  const ordersStorageValue = localStorage.getItem('order-summary-items');

  const orderStorageItems = (JSON.parse(ordersStorageValue as string) as Orders) ?? [];
  return orderStorageItems;
};

const setOrderSummaryItems = (payload: OrderIdentifier) => {
  let orderStorageItems = getOrderSummaryItems();
  const { action, day, meal, mealId } = payload;

  switch (action) {
    case 'REMOVE_ORDER': {
      if (!day || !mealId) {
        break;
      }

      const dayIndex = orderStorageItems.findIndex((ordersForDay) => ordersForDay.day === day);

      if (dayIndex === -1) {
        break;
      }

      orderStorageItems[dayIndex].orders = orderStorageItems[dayIndex].orders.filter(
        (order) => order.mealId !== mealId
      );

      if (orderStorageItems[dayIndex].orders.length === 0) {
        orderStorageItems.splice(dayIndex, 1);
      }

      if (orderStorageItems.length) {
        localStorage.setItem('order-summary-items', JSON.stringify(orderStorageItems));
      } else {
        localStorage.removeItem('order-summary-items');
      }

      window.dispatchEvent(new Event(orderSummaryEventName));
      break;
    }
    case 'ADD_ORDER': {
      if (!day || !meal) {
        break;
      }

      const dayIndex = orderStorageItems.findIndex((ordersForDay) => ordersForDay.day === day);

      if (dayIndex === -1) {
        orderStorageItems = [...orderStorageItems, { day, orders: [meal] }].sort(
          (aOrderDay, bOrderDay) => workdayToIndex[aOrderDay.day] - workdayToIndex[bOrderDay.day]
        );

        localStorage.setItem('order-summary-items', JSON.stringify(orderStorageItems));
        window.dispatchEvent(new Event(orderSummaryEventName));
        break;
      }

      if (orderStorageItems[dayIndex].orders.some((order) => order.mealId === meal.mealId)) {
        break;
      }

      const dishType = meal.mealType;

      const alreadyHasDishType = orderStorageItems[dayIndex].orders.some(
        (order) => order.mealType === dishType
      );

      if (alreadyHasDishType) {
        break;
      }

      orderStorageItems[dayIndex].orders.push(meal);
      localStorage.setItem('order-summary-items', JSON.stringify(orderStorageItems));
      window.dispatchEvent(new Event(orderSummaryEventName));
      break;
    }
    case 'CLEAR_ORDERS': {
      localStorage.removeItem('order-summary-items');
      window.dispatchEvent(new Event(orderSummaryEventName));
      break;
    }
    default:
      break;
  }
};

type OrderSummaryProviderProps = {
  children: ReactNode;
};

export function OrderSummaryProvider({ children }: OrderSummaryProviderProps) {
  const [state, setState] = useState<Orders>(getOrderSummaryItems());

  useEffect(() => {
    window.addEventListener(orderSummaryEventName, () => {
      setState(getOrderSummaryItems());
    });
  }, []);

  const orderSummaryValue = useMemo(
    () => ({ orders: state, modifyOrders: setOrderSummaryItems }),
    [state]
  );

  return (
    <OrderSummaryContext.Provider value={orderSummaryValue}>
      {children}
    </OrderSummaryContext.Provider>
  );
}
