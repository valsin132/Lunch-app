import classNames from 'classnames/bind';
import { ReactElement, useState } from 'react';
import { Button } from '../../../../../../components/Button';
import { UserProfile } from '../../../../../../utils/iconManager';
import { DishType } from '../../../../../../components/FoodCard/FoodCard.types';
import { getDishTypeImage } from '../../../../../../helpers/helperFunctions/getDishTypeImage';
import styles from './AvailableOrdersItem.module.css';

const cx = classNames.bind(styles);

export interface OrderItem {
  name: string;
  surname: string;
  img: string;
  orders: OrderInfo[];
}

export interface OrderInfo {
  title: string;
  vendor: string;
  dishType: DishType;
}

type AvailableOrdersItemProps = OrderItem & {
  onClick: () => void;
};

export function AvailableOrdersItem({
  name,
  surname,
  img,
  orders,
  onClick,
}: AvailableOrdersItemProps): ReactElement {
  const [imgLoadError, setImgLoadError] = useState(false);

  return (
    <tr className={cx('available-dish__content-wrapper')}>
      <td>
        {orders.map((order) => (
          <div key={order.title} className={cx('available-dish__wrapper')}>
            <img
              src={getDishTypeImage(order.dishType)}
              className={cx('available-dish__meal-image')}
              alt={order.dishType}
            />
            <p>{order.title}</p>
          </div>
        ))}
      </td>
      <td className={cx('available-dish__vendor-wrapper')}>
        {orders.map((order) => (
          <p key={order.title + order.vendor} className={cx('available-dish__vendor')}>
            {order.vendor}
          </p>
        ))}
      </td>
      <td className={cx('available-dish__user-wrapper')}>
        <div className={cx('available-dish__user-info-wrapper')}>
          {!imgLoadError ? (
            <img
              src={img}
              className={cx('available-dish__avatar-image')}
              alt="profile avatar"
              onError={() => setImgLoadError(true)}
            />
          ) : (
            <UserProfile className={cx('available-dish__avatar-image')} />
          )}
          <p className={cx('available-dish__user-name')}>
            {name} {surname}
          </p>
        </div>
        <Button title="Reserve" buttonType="secondary" buttonSize="sm" onClick={onClick} />
      </td>
    </tr>
  );
}
