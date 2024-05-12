import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import { Modal } from '../Modal';
import { ChilliIcon, PlantIcon } from '../../utils/iconManager';
import { DishType, getDishTypeImage } from '../FoodCard';
import { StarsRating } from '../StarsRating';
import styles from './DishDetails.module.css';

const cx = classNames.bind(styles);

type CommentProps = {
  id?: number;
  userIcon?: string;
  name?: string;
  surname?: string;
  comment?: string;
};

export type DishInfoProps = Omit<DishDetailsProps, 'setIsOpen' | 'onClick'>;

interface DishDetailsProps {
  vendor: string;
  title: string;
  isVegetarian: boolean;
  isSpicy: boolean;
  rating: string | number;
  description: string;
  price: number;
  dishType: DishType;
  setIsOpen: (isOpen: boolean) => void;
  onClick: () => void;
  comments?: CommentProps[];
}

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
  comments,
}: DishDetailsProps): ReactElement {
  return (
    <div className={cx('dish-details')}>
      <Modal
        title="Dish Details"
        modalSize="md"
        primaryButtonLabel="Add to Cart"
        secondaryButtonLabel="Close"
        setIsOpenModal={setIsOpen}
        onClick={onClick}>
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
                  <div className={cx('dish-details__icons')}>
                    {isVegetarian && <PlantIcon className={cx('dish-details__plant-icon')} />}
                    {isSpicy && <ChilliIcon className={cx('dish-details__chilli-icon')} />}
                  </div>
                </div>
                <StarsRating rating={Number(rating)} />
                <p className={cx('dish-details__rating')}>{rating}</p>
              </div>
              <p className={cx('dish-details__description')}>{description}</p>
              <div className={cx('dish-details__price')}>
                <p className={cx('dish-details__price-title')}>Price</p>
                <p className={cx('dish-details__price-value')}>&euro;{price}</p>
              </div>
            </div>
          </div>
          <div className={cx('dish-details__comments')}>
            {comments && (
              <p className={cx('dish-details__comments-number')}>Comments: ({comments.length})</p>
            )}
            {comments ? (
              comments.map((comment) => (
                <div className={cx('dish-details__comment')} key={comment.id}>
                  <div className={cx('dish-details__user')}>
                    <img
                      className={cx('dish-details__user-icon')}
                      src={comment.userIcon}
                      alt="user icon"
                    />
                    <p className={cx('dish-details__user-name')}>
                      {comment.name} {comment.surname}
                    </p>
                  </div>
                  <p className={cx('dish-details__comment-text')}>{comment.comment}</p>
                </div>
              ))
            ) : (
              <p className={cx('dish-details__comments-number')}>No comments yet</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
