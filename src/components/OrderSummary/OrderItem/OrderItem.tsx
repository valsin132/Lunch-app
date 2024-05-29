import classNames from 'classnames/bind';
import { DeleteBinIcon } from '../../../utils/iconManager';
import { Order, Workdays } from '../../../helpers/OrderSummaryContext';
import { useOrderSummary } from '../../../hooks/useOrderSummary';
import { getDishTypeImage } from '../../../helpers/helperFunctions/getDishTypeImage';
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
          <h3 className={cx('order-item__info-title')}>{order.title}</h3>
          <div className={cx('order-item__info-body-actions')}>
            <span className={cx('order-item__info-body-actions-price')}>
              {order.price.toFixed(2)}
            </span>
            <button
              className={cx('order-item__info-body-actions-remove')}
              aria-label={`Remove ${order.title} from order summary`}
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
