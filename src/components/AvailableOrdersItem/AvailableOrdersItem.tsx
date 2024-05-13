import classNames from 'classnames/bind';
import { ReactElement } from 'react';
import { DishType, getDishTypeImage } from '../FoodCard';
import { Button } from '../Button';
import { Card } from '../Card';
import styles from './AvailableOrdersItem.module.css';

const cx = classNames.bind(styles);

interface AvailableOrdersItemProps {
  title: string[];
  vendor: string[];
  name: string;
  surname: string;
  img: string;
  dishType: DishType;
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
  return (
    <Card isNoBorder isFullWidth shadow="xs" spacing="none">
      <div className={cx('available-dish__content')}>
        <div className={cx('available-dish__1section')}>
          {title.map((mealTitle) => (
            <div key={mealTitle} className={cx('available-dish__1')}>
              <img
                src={getDishTypeImage(dishType)}
                className={cx('available-dish__food-image1')}
                alt={dishType}
              />
              <h3 className={cx('available-dish__title1')}>{mealTitle}</h3>
            </div>
          ))}
        </div>
        <div className={cx('available-dish__2section')}>
          {vendor.map((mealVendor, id) => (
            <h4 key={mealVendor + title[id]} className={cx('available-dish__vendor1')}>
              {mealVendor}
            </h4>
          ))}
        </div>

        <div className={cx('available-dish__3section')}>
          <div className={cx('available-dish__avatar-container')}>
            <img src={img} className={cx('available-dish__avatar-image')} alt="profile avatar" />
          </div>
          <h5 className={cx('available-dish__user-name')}>
            {name} {surname}
          </h5>
        </div>
        <div className={cx('available-dish__4section')}>
          <Button title="Reserve" buttonType="secondary" buttonSize="sm" onClick={onClick} />
        </div>
      </div>
    </Card>
  );
}
