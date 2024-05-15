import { ReactElement, useState } from 'react';
import classNames from 'classnames/bind';
import { Modal } from '../../../Modal';
import { ChilliIcon, PlantIcon, UserProfile } from '../../../../utils/iconManager';
import { getDishTypeImage } from '../../../../helpers/helperFunctions/getDishTypeImage';
import { StarsRating } from '../../../StarsRating';
import { FoodCardProps } from '../../FoodCard.types';
import styles from './DishDetailsModal.module.css';

const cx = classNames.bind(styles);

export function DishDetailsModal({
  vendor,
  title,
  isVegetarian,
  isSpicy,
  rating,
  description,
  price,
  setIsOpen,
  onClick,
  dishType,
  isDisabled,
  comments,
}: FoodCardProps): ReactElement {
  const [imgLoadError, setImgLoadError] = useState(false);

  return (
    <div className={cx('dish-details')}>
      <Modal
        title="Dish Details"
        modalSize="md"
        isSmallerUpperGap
        primaryButtonLabel="Add to Cart"
        secondaryButtonLabel="Close"
        setIsOpenModal={setIsOpen}
        onClick={onClick}
        isDisabled={isDisabled}>
        <div className={cx('dish-details__container')}>
          <div className={cx('dish-details__content')}>
            <img
              className={cx('dish-details__image')}
              src={getDishTypeImage(dishType)}
              alt={dishType}
            />
            <div className={cx('dish-details__information')}>
              <div className={cx('dish-details__header')}>
                <p className={cx('dish-details__vendor')}>{vendor}</p>
                <div className={cx('dish-details__title-container')}>
                  <p className={cx('dish-details__title')}>{title}</p>
                  {(isVegetarian || isSpicy) && (
                    <div className={cx('dish-details__icons')}>
                      {isVegetarian && <PlantIcon className={cx('dish-details__plant-icon')} />}
                      {isSpicy && <ChilliIcon className={cx('dish-details__chilli-icon')} />}
                    </div>
                  )}
                </div>
                <div className={cx('dish-details__rating-container')}>
                  <StarsRating rating={Number(rating)} />
                  <p className={cx('dish-details__rating')}>{rating}</p>
                </div>
              </div>
              <div className={cx('dish-details__description-container')}>
                <p className={cx('dish-details__description')}>{description}</p>
                <div className={cx('dish-details__price')}>
                  <p className={cx('dish-details__price-title')}>Price</p>
                  <p className={cx('dish-details__price-value')}>&euro;{price}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('dish-details__comments-section')}>
            <p className={cx('dish-details__comments-title')}>
              {comments?.length ? `Comments (${comments.length})` : 'No comments yet'}
            </p>
            {comments && comments.length > 0 && (
              <div className={cx('dish-details__comments-container')}>
                {comments?.map((comment) => (
                  <div className={cx('dish-details__comment')} key={comment.comment}>
                    <div className={cx('dish-details__user')}>
                      {imgLoadError ? (
                        <UserProfile className={cx('dish-details__user-icon')} />
                      ) : (
                        <img
                          className={cx('dish-details__user-icon')}
                          src={comment.userIcon}
                          alt="user icon"
                          onError={() => setImgLoadError(true)}
                        />
                      )}
                      <p className={cx('dish-details__user-name')}>
                        {comment.name} {comment.surname}
                      </p>
                    </div>
                    <p className={cx('dish-details__comment-text')}>{comment.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
