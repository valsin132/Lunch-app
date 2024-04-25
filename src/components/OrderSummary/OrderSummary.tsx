import classNames from 'classnames/bind';
import { useRef } from 'react';
import { CloseIcon } from '../../utils/iconManager';
import { Order } from './OrderItem';
import { FormattedOrders, OrderDay, Workdays } from './OrderDay';
import { Card } from '../Card';
import { OrderButton } from './OrderButton/OrderButton';
import styles from './OrderSummary.module.css';

const cx = classNames.bind(styles);

type OrderSummaryProps = {
  monday?: Order[];
  tuesday?: Order[];
  wednesday?: Order[];
  thursday?: Order[];
  friday?: Order[];
};

type OrderArray = Order[] | undefined;

export function OrderSummary({ monday, tuesday, wednesday, thursday, friday }: OrderSummaryProps) {
  const foodContainerRef = useRef(null);

  const calculateIsArrayEmpty = (...args: OrderArray[]) => {
    const filtered = args.filter((arr) => {
      if (!arr) return false;
      return arr.length;
    });
    return !filtered.length;
  };

  const isEmpty = calculateIsArrayEmpty(monday, tuesday, wednesday, thursday, friday);

  const formatOrdersArray = (...args: OrderArray[]): FormattedOrders[] => {
    const workdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const formatedArr = args.map((arr, idx) => ({
      day: workdayNames[idx] as Workdays,
      orders: arr as Order[],
    }));
    return formatedArr.filter((day) => !!day.orders);
  };

  const orders = formatOrdersArray(monday, tuesday, wednesday, thursday, friday);

  const totalPrice = orders.reduce(
    (total, currentOrders) =>
      total + currentOrders.orders.reduce((accum, cur) => accum + cur.price, 0),
    0
  );

  const handleOrdering = () => {
    alert('Order');
  };

  return (
    <aside className={cx('order-summary')}>
      <Card spacing="xs" shadow="s" roundedCorners="left">
        <div className={cx('order-summary__content-wrapper')}>
          <div className={cx('order-summary__wrapper')}>
            <div className={cx('order-summary__header')}>
              <h2>Order Summary</h2>
              <button
                className={cx('order-summary__close-button')}
                onClick={() => {
                  alert('Close menu');
                }}
                aria-label="Close order summary"
                type="button">
                <CloseIcon />
              </button>
            </div>
            <section ref={foodContainerRef} className={cx('order-summary__orders-wrapper')}>
              {isEmpty
                ? 'There are no orders'
                : orders.map((order) => <OrderDay key={order.day} details={order} />)}
            </section>
          </div>
          <div className={cx('order-summary__footer')}>
            <div>
              <div className={cx('order-summary__price-wrapper')}>
                <span className={cx('order-summary__price-title')}>Total price</span>
                <span className={cx('order-summary__price')}>{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <OrderButton onSubmit={handleOrdering} disabled={isEmpty} />
          </div>
        </div>
      </Card>
    </aside>
  );
}
