import classNames from 'classnames/bind';
import { CloseIcon } from '../../utils/iconManager';
import { Order } from './OrderItem';
import { FormattedOrders, OrderDay, Workdays } from './OrderDay';
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
      <div className={cx('order-summary__wrapper')}>
        <div className={cx('order-summary__header')}>
          <h2>Order Summary</h2>
          <button
            onClick={() => {
              alert('Close menu');
            }}
            aria-label="Close order summary"
            type="button">
            <CloseIcon />
          </button>
        </div>
        <section className={cx('order-summary__orders-wrapper')}>
          {isEmpty
            ? 'There are no orders'
            : orders.map((order) => <OrderDay key={order.day} details={order} />)}
        </section>
      </div>
      <div>
        <div>Total price {totalPrice}</div>
        <button onClick={handleOrdering} type="button">
          Buy
        </button>
      </div>
    </aside>
  );
}
