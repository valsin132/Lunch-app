import classNames from 'classnames/bind';
import { useState } from 'react';
import { CloseIcon } from '../../utils/iconManager';
import { OrderDay } from './OrderDay';
import { Card } from '../Card';
import { Order } from '../../pages/FoodMenu/FoodMenu.types';
import { OrderButton } from './OrderButton';
import { OrderDayType } from '../../helpers/OrderSummaryContext';
import { EmptyCart } from './EmptyCart';
import { Dialog } from '../Dialog';
import { useOrderSummary } from '../../hooks/useOrderSummary';
import styles from './OrderSummary.module.css';

const cx = classNames.bind(styles);

type OrderSummaryProps = {
  visibilityHandler: () => void;
};

export function OrderSummary({ visibilityHandler }: OrderSummaryProps) {
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const orderSummaryContext = useOrderSummary();
  let userBalance = 0;
  const isOrderCartEmpty = orderSummaryContext.orders.length < 1;

  const calculateDayTotal = ({ orders }: OrderDayType) =>
    orders.reduce((totalDayPrice, currentMeal) => totalDayPrice + currentMeal.price, 0);

  const calculateTotalPrice = () =>
    orderSummaryContext.orders.reduce(
      (total, ordersForDay) => total + calculateDayTotal(ordersForDay),
      0
    );

  const totalPrice = calculateTotalPrice();
  const userData = localStorage.getItem('userData');
  if (userData) {
    const userDataObject = JSON.parse(userData);
    userBalance = userDataObject.balance;
  }

  const handleOrderSubmit = (isDialogOpen: boolean) => {
    setIsConfirmationDialogOpen(isDialogOpen);
    if (!isDialogOpen) {
      const userDataStored = localStorage.getItem('userData');
      if (userDataStored) {
        const userDataObject = JSON.parse(userDataStored);
        userBalance = userDataObject.balance;
        for (let i = 0; i <= orderSummaryContext.orders.length - 1; i += 1) {
          const newOrder: Order = { weekDay: '', mealIds: [] };
          const orderWeekDay =
            orderSummaryContext.orders[i].day.charAt(0).toUpperCase() +
            orderSummaryContext.orders[i].day.slice(1);
          userDataObject.orders.push(newOrder);
          newOrder.weekDay = orderWeekDay;
          for (let j = 0; j <= orderSummaryContext.orders[i].orders.length - 1; j += 1) {
            const mealIdsByDay = orderSummaryContext.orders[i].orders[j].mealId;
            newOrder.mealIds.push(mealIdsByDay);
          }
        }
        const newBalance = userDataObject.balance - Number(totalPrice.toFixed(2));
        userDataObject.balance = newBalance.toFixed(2);
        localStorage.setItem('userData', JSON.stringify(userDataObject));
        window.dispatchEvent(new Event('localStorageUpdate'));
        fetch('http://localhost:3002/user', {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDataObject),
        });
      }
      orderSummaryContext.modifyOrders({ action: 'CLEAR_ORDERS' });
    }
  };
  return (
    <aside className={cx('order-summary')}>
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
              {Number(totalPrice.toFixed(2)) >= userBalance && (
                <span className={cx('order-summary__error-message')}>
                  Not enough money in your account
                </span>
              )}
            </div>
            <OrderButton
              onSubmit={() => {
                setIsConfirmationDialogOpen(true);
              }}
              isDisabled={isOrderCartEmpty || Number(totalPrice.toFixed(2)) >= userBalance}
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
