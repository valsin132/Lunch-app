import { Order, OrderItem } from '../OrderItem';

export type FormattedOrders = { day: Workdays; orders: Order[] };
export type Workdays = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

type OrderDayProps = { details: FormattedOrders };

export function OrderDay({ details }: OrderDayProps) {
  return (
    <article>
      {details.orders.map((order) => (
        <OrderItem details={order} key={order.mealId} />
      ))}
    </article>
  );
}
