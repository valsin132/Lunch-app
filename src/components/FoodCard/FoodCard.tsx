import { ReactElement, useState } from 'react';
import classNames from 'classnames/bind';
import { Card } from '../Card';
import { Button } from '../Button';
import { ChilliIcon, PlantIcon, StarFullIcon } from '../../utils/iconManager';
import { DishDetailsModal } from './components/DishDetailsModal';
import { getDishTypeImage } from './getDishTypeImage';
import { FoodCardProps } from './FoodCard.types';
import styles from './FoodCard.module.css';

const cx = classNames.bind(styles);

export function FoodCard({
  vendor,
  title,
  description,
  price,
  isVegetarian,
  isSpicy,
  rating,
  dishType,
  onClick,
  comments,
}: FoodCardProps): ReactElement {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className={cx('food-card')}>
      <Card isNoBorder shadow="m" spacing="none">
        <div className={cx('food-card__content')}>
          <div className={cx('food-card__header')}>
            <div className={cx('food-card__image-placeholder')}>
              <img
                src={getDishTypeImage(dishType)}
                className={cx('food-card__food-image')}
                alt={dishType}
              />
            </div>
            <div className={cx('food-card__header-content')}>
              <h4 className={cx('food-card__vendor')}>{vendor}</h4>
              <h3 className={cx('food-card__title')}>{title}</h3>
              <div className={cx('food-card__header-icons')}>
                {isVegetarian && <PlantIcon className={cx('food-card__plant-icon')} />}
                {isSpicy && <ChilliIcon className={cx('food-card__chilli-icon')} />}
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
                onClick={() => setIsOpenModal(true)}
              />
            </div>
          </div>
          <div className={cx('food-card__footer')}>
            <div>
              <p className={cx('food-card__footer-price')}>Price</p>
              <p className={cx('food-card__footer-euro')}>
                &euro;
                {price.toFixed(2)}
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
      {isOpenModal && (
        <DishDetailsModal
          vendor={vendor}
          title={title}
          description={description}
          price={price}
          isVegetarian={isVegetarian}
          isSpicy={isSpicy}
          rating={rating}
          dishType={dishType}
          comments={comments}
          setIsOpen={() => {
            setIsOpenModal(false);
          }}
          onClick={onclick}
        />
      )}
    </div>
  );
}
