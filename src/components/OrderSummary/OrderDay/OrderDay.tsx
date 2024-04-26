import classNames from 'classnames/bind';
import { OrderItem } from '../OrderItem';
import { Order, Workdays } from '../../../helpers/OrderSummaryContext';
import styles from './OrderDay.module.css';

const cx = classNames.bind(styles);

type OrderDayProps = {
  day: Workdays;
  orders: Order[];
};

export function OrderDay({ day, orders }: OrderDayProps) {
  return (
    <article className={cx('order-day')}>
      <h3 className={cx('order-day__header')}>{day[0].toUpperCase() + day.substring(1)}</h3>
      {orders.map((order) => (
        <OrderItem day={day} order={order} key={day + order.mealId} />
      ))}
    </article>
  );
}
