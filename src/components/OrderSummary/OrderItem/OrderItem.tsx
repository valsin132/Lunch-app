import classNames from 'classnames/bind';
import { DishType, getDishTypeImage } from '../../FoodCard';
import { DeleteBinIcon } from '../../../utils/iconManager';
import styles from './OrderItem.module.css';

const cx = classNames.bind(styles);

export type Order = {
  dishType: DishType;
  vendor: string;
  title: string;
  price: number;
  mealId: number;
};

type OrderItemProps = {
  details: Order;
};

export function OrderItem({ details }: OrderItemProps) {
  const handleItemRemoval = () => {
    alert(`removing item ${details.mealId}`);
  };

  return (
    <article className={cx('order-item')}>
      <div>
        <img
          className={cx('order-item__icon')}
          src={getDishTypeImage(details.dishType)}
          alt={details.title}
        />
      </div>
      <div className={cx('order-item__info')}>
        <span className={cx('order-item__info__title')}>{details.vendor}</span>
        <div className={cx('order-item__info__body')}>
          <span>{details.title}</span>
          <div className={cx('order-item__info__body__actions')}>
            <span className={cx('order-item__info__body__actions__price')}>
              {details.price.toFixed(2)}
            </span>
            <button
              className={cx('order-item__info__body__actions__remove')}
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
