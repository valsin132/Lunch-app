import classNames from 'classnames/bind';
import { DeleteBinIcon } from '../../../utils/iconManager';
import { Order, Workdays, useOrderSummary } from '../../../helpers/OrderSummaryContext';
import { getDishTypeImage } from '../../FoodCard/getDishTypeImage';
import styles from './OrderItem.module.css';

const cx = classNames.bind(styles);

type OrderItemProps = {
  day: Workdays;
  order: Order;
};

export function OrderItem({ day, order }: OrderItemProps) {
  const items = useOrderSummary();
  const handleItemRemoval = () => {
    items.modifyOrders({ day, mealId: order.mealId, action: 'REMOVE_ORDER' });
  };
  return (
    <article className={cx('order-item')}>
      <div>
        <img
          className={cx('order-item__icon')}
          src={getDishTypeImage(order.dishType)}
          alt={order.title}
        />
      </div>
      <div className={cx('order-item__info')}>
        <span className={cx('order-item__info-vendor')}>{order.vendor}</span>
        <div className={cx('order-item__info-body')}>
          <div className={cx('order-item__info-title')}>{order.title}</div>
          <div className={cx('order-item__info-body-actions')}>
            <span className={cx('order-item__info-body-actions-price')}>
              {order.price.toFixed(2)}
            </span>
            <button
              className={cx('order-item__info-body-actions-remove')}
              aria-label="remove-order-summary-item"
              type="button"
              onClick={handleItemRemoval}>
              <DeleteBinIcon />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
