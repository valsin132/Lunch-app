import classNames from 'classnames/bind';
import { Order, OrderItem } from '../OrderItem';
import styles from './OrderDay.module.css';

const cx = classNames.bind(styles);

export type FormattedOrders = { day: Workdays; orders: Order[] };
export type Workdays = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

type OrderDayProps = { details: FormattedOrders };

export function OrderDay({ details }: OrderDayProps) {
  return (
    <article className={cx('order-day')}>
      <h3 className={cx('order-day__header')}>{details.day}</h3>
      {details.orders.map((order) => (
        <OrderItem details={order} key={details.day + order.mealId} />
      ))}
    </article>
  );
}
