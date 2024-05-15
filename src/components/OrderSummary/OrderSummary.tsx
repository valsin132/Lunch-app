import classNames from 'classnames/bind';
import { useState } from 'react';
import { CloseIcon } from '../../utils/iconManager';
import { OrderDay } from './OrderDay';
import { Card } from '../Card';
import { OrderButton } from './OrderButton';
import { OrderDayType, Workdays } from '../../helpers/OrderSummaryContext';
import { EmptyCart } from './EmptyCart';
import { Dialog } from '../Dialog';
import { useOrderSummary } from '../../hooks/useOrderSummary';
import { Button } from '../Button';
import styles from './OrderSummary.module.css';

const cx = classNames.bind(styles);

type OrderSummaryProps = {
  visibilityHandler: () => void;
};

export function OrderSummary({ visibilityHandler }: OrderSummaryProps) {
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [mealId, setMealId] = useState(1);
  const [day, setDay] = useState<Workdays>('friday');
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

  const handleOrderSubmit = (isDialogOpen: boolean) => {
    setIsConfirmationDialogOpen(isDialogOpen);
    if (!isDialogOpen) {
      orderSummaryContext.modifyOrders({ action: 'CLEAR_ORDERS' });
    }
  };

  return (
    <aside className={cx('order-summary')}>
      <Button
        buttonSize="md"
        buttonType="primary"
        title="Hello"
        onClick={() => {
          orderSummaryContext.modifyOrders({
            action: 'ADD_ORDER',
            day,
            meal: {
              dishType: 'bowl',
              mealId,
              price: 4 + mealId,
              title: 'Wardas',
              vendor: `Chiga${mealId}`,
            },
          });
          if (mealId === 2) setDay('monday');
          if (mealId === 3) setDay('thursday');
          if (mealId === 5) setDay('wednesday');
          if (mealId === 7) setDay('tuesday');
          setMealId((cur) => cur + 1);
        }}
      />
      <Card spacing="none" shadow="s" roundedCorners="left" isNoBorder>
        <div className={cx('order-summary__content-wrapper')}>
          <div
            className={cx('order-summary__wrapper', {
              'order-summary__wrapper--empty': isOrderCartEmpty,
            })}>
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
              {!isOrderCartEmpty ? (
                orderSummaryContext.orders.map((ordersForDay) => (
                  <OrderDay
                    day={ordersForDay.day}
                    orders={ordersForDay.orders}
                    key={ordersForDay.day}
                  />
                ))
              ) : (
                <EmptyCart />
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
          setIsOpen={handleOrderSubmit}
          onClick={() => {
            handleOrderSubmit(false);
          }}>
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
