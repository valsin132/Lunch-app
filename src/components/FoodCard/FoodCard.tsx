import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import { Card } from '../Card';
import { Button } from '../Button';
import { ChilliIcon, PlantIcon, StarFullIcon } from '../../utils/iconManager';
import styles from './FoodCard.module.css';

const cx = classNames.bind(styles);

interface FoodCardProps {
  vendor: string;
  title: string;
  description: string;
  price: number;
  vegetarian: boolean;
  spicy: boolean;
  rating: number;
  dishType: string;
  onClick: () => void;
}

export function FoodCard({
  vendor,
  title,
  description,
  price,
  vegetarian,
  spicy,
  rating,
  dishType,
  onClick,
}: FoodCardProps): ReactElement {
  return (
    <div className={cx('foodCard')}>
      <Card shadow="m" spacing="none">
        <div className={cx('foodCard__content')}>
          <div className={cx('foodCard__section1')}>
            <div className={cx('foodCard__image-placeholder')}>
              <img src={dishType} className={cx('foodCard__food-icon')} alt={dishType} />
            </div>
            <div className={cx('foodCard__header-content')}>
              <h4 className={cx('foodCard__vendor')}>{vendor}</h4>
              <h3 className={cx('foodCard__title')}>{title}</h3>
              <div>
                {vegetarian && <PlantIcon className={cx('foodCard__plant-icon')} />}
                {spicy && <ChilliIcon className={cx('foodCard__chilli-icon')} />}
              </div>
            </div>
          </div>
          <div className={cx('foodCard__section2')}>
            <p className={cx('foodCard__description')}>{description}</p>
            <div className={cx('foodCard__rating-btn')}>
              <div className={cx('foodCard__rating')}>
                <StarFullIcon className={cx('foodCard__rating-icon')} />
                <p className={cx('foodCard__rating-number')}>{rating}</p>
              </div>
              <Button
                title="More info"
                iconType="arrow"
                buttonType="tertiary"
                buttonSize="sm"
                onClick={onClick}
              />
            </div>
          </div>
          <div className={cx('foodCard__section3')}>
            <div>
              <p className={cx('foodCard__section3--price')}>Price</p>
              <p className={cx('foodCard__section3--euro')}>
                &euro;
                {price}
              </p>
            </div>
            <div>
              <Button
                title="Add to cart"
                iconType="plus"
                buttonType="secondary"
                buttonSize="sm"
                onClick={onClick}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
