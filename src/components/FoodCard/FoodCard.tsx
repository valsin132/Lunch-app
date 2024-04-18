import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import { Card } from '../Card';
import { Button } from '../Button';
import { ChilliIcon, PlantIcon, StarFullIcon } from '../../utils/iconManager';
import {
  kebabImage,
  soupImage,
  pizzaImage,
  sandwichImage,
  burgerImage,
  logoWithoutText,
} from '../../utils/imageManager';
import styles from './FoodCard.module.css';

const cx = classNames.bind(styles);

type DishType = 'wrap' | 'soup' | 'pizza' | 'sandwich' | 'burger' | 'bowl';

interface FoodCardProps {
  vendor: string;
  title: string;
  description: string;
  price: number;
  vegetarian: boolean;
  spicy: boolean;
  rating: number;
  dishType: DishType;
  onClick: () => void;
  onMoreInfoClick: () => void;
}

const getDishTypeImage = (dishType: DishType): string => {
  switch (dishType) {
    case 'wrap':
      return kebabImage;
    case 'soup':
      return soupImage;
    case 'pizza':
      return pizzaImage;
    case 'sandwich':
      return sandwichImage;
    case 'burger':
      return burgerImage;
    case 'bowl':
      return soupImage;
    default:
      return logoWithoutText;
  }
};

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
  onMoreInfoClick,
}: FoodCardProps): ReactElement {
  return (
    <div className={cx('food-card')}>
      <Card shadow="m" spacing="none">
        <div className={cx('food-card__content')}>
          <div className={cx('food-card__header')}>
            <div className={cx('food-card__image-placeholder')}>
              <img
                src={getDishTypeImage(dishType)}
                className={cx('food-card__food-icon')}
                alt={dishType}
              />
            </div>
            <div className={cx('food-card__header-content')}>
              <h4 className={cx('food-card__vendor')}>{vendor}</h4>
              <h3 className={cx('food-card__title')}>{title}</h3>
              <div>
                {vegetarian && <PlantIcon className={cx('food-card__plant-icon')} />}
                {spicy && <ChilliIcon className={cx('food-card__chilli-icon')} />}
              </div>
            </div>
          </div>
          <div className={cx('food-card__body')}>
            <p className={cx('food-card__description')}>{description}</p>
            <div className={cx('food-card__rating-container')}>
              <div className={cx('food-card__rating')}>
                <StarFullIcon className={cx('food-card__rating-icon')} />
                <p className={cx('food-card__rating-number')}>{rating}</p>
              </div>
              <Button
                title="More info"
                iconType="arrow"
                buttonType="tertiary"
                buttonSize="sm"
                onClick={onMoreInfoClick}
              />
            </div>
          </div>
          <div className={cx('food-card__footer')}>
            <div>
              <p className={cx('food-card__footer-price')}>Price</p>
              <p className={cx('food-card__footer-euro')}>
                &euro;
                {price}
              </p>
            </div>
            <Button
              title="Add to cart"
              iconType="plus"
              buttonType="secondary"
              buttonSize="sm"
              onClick={onClick}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
