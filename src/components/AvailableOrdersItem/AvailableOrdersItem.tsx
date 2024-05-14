import classNames from 'classnames/bind';
import { ReactElement, useState } from 'react';
import { DishType, getDishTypeImage } from '../FoodCard';
import { Button } from '../Button';
import { Card } from '../Card';
import { UserProfile } from '../../utils/iconManager';
import styles from './AvailableOrdersItem.module.css';

const cx = classNames.bind(styles);

interface AvailableOrdersItemProps {
  name: string;
  surname: string;
  img: string;
  orders: OrderInfo[];
  onClick: () => void;
}

interface OrderInfo {
  title: string;
  vendor: string;
  dishType: DishType;
}

export function AvailableOrdersItem({
  name,
  surname,
  img,
  orders,
  onClick,
}: AvailableOrdersItemProps): ReactElement {
  const [imgLoadError, setImgLoadError] = useState(false);

  return (
    <Card isNoBorder isFullWidth shadow="xs" spacing="none">
      <div className={cx('available-dish__content-wrapper')}>
        <div className={cx('available-dish__meal-wrapper')}>
          {orders.map((order, id) => (
            <div key={order + order.title[id]} className={cx('available-dish__wrapper')}>
              <img
                src={getDishTypeImage(order.dishType)}
                className={cx('available-dish__food-image')}
                alt={order.dishType}
              />
              <p>{order.title}</p>
            </div>
          ))}
        </div>
        <div className={cx('available-dish__vendor-wrapper')}>
          {orders.map((order, id) => (
            <p key={order + order.vendor[id]} className={cx('available-dish__vendor')}>
              {order.vendor}
            </p>
          ))}
        </div>
        <div className={cx('available-dish__user-wrapper')}>
          <div className={cx('available-dish__avatar-wrapper')}>
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
          </div>
          <p className={cx('available-dish__user-name')}>
            {name} {surname}
          </p>
        </div>
        <div className={cx('available-dish__reserve-button')}>
          <Button title="Reserve" buttonType="secondary" buttonSize="sm" onClick={onClick} />
        </div>
      </div>
    </Card>
  );
}
