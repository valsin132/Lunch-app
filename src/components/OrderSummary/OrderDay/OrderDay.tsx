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
      <section className={cx('order-day__orders-container')}>
        {orders.map((order) => (
          <OrderItem day={day} order={order} key={day + order.mealId} />
        ))}
      </section>
    </article>
  );
}
