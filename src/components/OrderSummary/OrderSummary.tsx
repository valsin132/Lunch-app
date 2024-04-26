import classNames from 'classnames/bind';
import { CloseIcon } from '../../utils/iconManager';
import { OrderDay } from './OrderDay';
import { Card } from '../Card';
import { OrderButton } from './OrderButton/OrderButton';
import { Order, Workdays, useOrderSummary } from '../../helpers/OrderSummaryContext';
import { EmptyCart } from './EmptyCart';
import styles from './OrderSummary.module.css';

const cx = classNames.bind(styles);

type OrderSummaryProps = {
  visibilityHandler: () => void;
};

type OrderArray = Order[] | undefined;

export function OrderSummary({ visibilityHandler }: OrderSummaryProps) {
  const orderSummaryContext = useOrderSummary();

  const calculateIsArrayEmpty = (...args: OrderArray[]) => {
    const filtered = args.filter((arr) => {
      if (!arr) return false;
      return arr.length;
    });
    return !filtered.length;
  };

  const orderArr = Object.values(orderSummaryContext.orders) as Order[][];
  const orderDays = Object.keys(orderSummaryContext.orders) as Workdays[];

  const isEmpty = calculateIsArrayEmpty(...orderArr);
  const totalPrice = orderArr.reduce(
    (total, currentOrders) => total + currentOrders.reduce((accum, cur) => accum + cur.price, 0),
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
                onClick={visibilityHandler}
                aria-label="Close order summary"
                type="button">
                <CloseIcon />
              </button>
            </div>
            <section className={cx('order-summary__orders-wrapper')}>
              {isEmpty ? (
                <EmptyCart />
              ) : (
                orderDays.map((orderDay) =>
                  orderSummaryContext.orders[orderDay].length ? (
                    <OrderDay
                      key={orderDay}
                      day={orderDay}
                      orders={orderSummaryContext.orders[orderDay]}
                    />
                  ) : null
                )
              )}
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
