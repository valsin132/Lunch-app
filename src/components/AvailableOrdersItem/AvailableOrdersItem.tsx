import classNames from 'classnames/bind';
import { ReactElement, useState } from 'react';
import { DishType, getDishTypeImage } from '../FoodCard';
import { Button } from '../Button';
import { Card } from '../Card';
import { UserProfile } from '../../utils/iconManager';
import styles from './AvailableOrdersItem.module.css';

const cx = classNames.bind(styles);

interface AvailableOrdersItemProps {
  title: string[];
  vendor: string[];
  name: string;
  surname: string;
  img: string;
  dishType: DishType[];
  onClick: () => void;
}

export function AvailableOrdersItem({
  title,
  vendor,
  name,
  surname,
  img,
  dishType,
  onClick,
}: AvailableOrdersItemProps): ReactElement {
  const [imgLoadError, setImgLoadError] = useState(false);

  return (
    <Card isNoBorder isFullWidth shadow="xs" spacing="none">
      <div className={cx('available-dish__content-wrapper')}>
        <div className={cx('available-dish__meal-wrapper')}>
          {title.map((mealTitle, index) => (
            <div key={mealTitle} className={cx('available-dish__wrapper')}>
              <img
                src={getDishTypeImage(dishType[index])}
                className={cx('available-dish__food-image')}
                alt={dishType[index]}
              />
              <h3>{mealTitle}</h3>
            </div>
          ))}
        </div>
        <div className={cx('available-dish__vendor-wrapper')}>
          {vendor.map((mealVendor, id) => (
            <h4 key={mealVendor + title[id]} className={cx('available-dish__vendor')}>
              {mealVendor}
            </h4>
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
          <h5 className={cx('available-dish__user-name')}>
            {name} {surname}
          </h5>
        </div>
        <div className={cx('available-dish__reserve-button')}>
          <Button title="Reserve" buttonType="secondary" buttonSize="sm" onClick={onClick} />
        </div>
      </div>
    </Card>
  );
}
