import classNames from 'classnames/bind';
import { useState } from 'react';
import { CloseIcon } from '../../utils/iconManager';
import { OrderDay } from './OrderDay';
import { Card } from '../Card';
import { OrderButton } from './OrderButton';
import { OrderDayType, useOrderSummary } from '../../helpers/OrderSummaryContext';
import { EmptyCart } from './EmptyCart';
import { Dialog } from '../Dialog';
import styles from './OrderSummary.module.css';

const cx = classNames.bind(styles);

type OrderSummaryProps = {
  visibilityHandler: () => void;
};

export function OrderSummary({ visibilityHandler }: OrderSummaryProps) {
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const orderSummaryContext = useOrderSummary();

  const isOrderCartEmpty = orderSummaryContext.orders.length < 1;

  const calculateDayTotal = ({ orders }: OrderDayType) =>
    orders.reduce((totalDayPrice, currentMeal) => totalDayPrice + currentMeal.price, 0);

  const calculateTotalPrice = () =>
    orderSummaryContext.orders.reduce(
      (total, ordersForDay) => total + calculateDayTotal(ordersForDay),
      0
    );

  const totalPrice = calculateTotalPrice();

  const handleOrderSubmit = () => {
    orderSummaryContext.modifyOrders({ action: 'CLEAR_ORDERS' });
    setIsConfirmationDialogOpen(false);
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
              {isOrderCartEmpty ? (
                <EmptyCart />
              ) : (
                orderSummaryContext.orders.map((ordersForDay) => (
                  <OrderDay
                    day={ordersForDay.day}
                    orders={ordersForDay.orders}
                    key={ordersForDay.day}
                  />
                ))
              )}
            </section>
          </div>
          <div className={cx('order-summary__footer')}>
            <div className={cx('order-summary__price-wrapper')}>
              <span className={cx('order-summary__price-title')}>Total price</span>
              <span className={cx('order-summary__price')}>{totalPrice.toFixed(2)}</span>
            </div>
            <OrderButton
              onSubmit={() => {
                setIsConfirmationDialogOpen(true);
              }}
              isDisabled={isOrderCartEmpty}
            />
          </div>
        </div>
      </Card>
      {isConfirmationDialogOpen && (
        <Dialog
          dialogHeaderTitle="We've got your lunch order!"
          dialogType="success"
          primaryButtonLabel="Cool, Thanks!"
          setIsOpen={setIsConfirmationDialogOpen}
          onClick={handleOrderSubmit}>
          <p>
            Order has been placed successfully.
            <br />
            <br />
            You can view lunch for the week in <b>Your Orders.</b>
          </p>
        </Dialog>
      )}
    </aside>
  );
}
