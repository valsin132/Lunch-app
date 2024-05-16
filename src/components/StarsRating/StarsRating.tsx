import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import { StarEmptyIcon, StarFullIcon, StarHalfFullIcon } from '../../utils/iconManager';
import styles from './StarsRating.module.css';

const cx = classNames.bind(styles);

type RatingProps = {
  rating: number;
};

export function StarsRating({ rating }: RatingProps): ReactElement {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = [];
  for (let i = 0; i < 5; i += 1) {
    if (i < fullStars) {
      stars.push(
        <StarFullIcon className={cx('stars-rating__icon', 'stars-rating__icon-filled')} key={i} />
      );
    } else if (hasHalfStar && i === fullStars) {
      stars.push(
        <StarHalfFullIcon
          className={cx('stars-rating__icon', 'stars-rating__icon-filled')}
          key={i}
        />
      );
    } else {
      stars.push(<StarEmptyIcon className={cx('stars-rating__icon')} key={i} />);
    }
  }
  return <div className={cx('stars-rating')}> {stars} </div>;
}
