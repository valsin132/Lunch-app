import classNames from 'classnames/bind';
import { basketImage } from '../../../utils/imageManager';
import styles from './EmptyCard.module.css';

const cx = classNames.bind(styles);

export function EmptyCart() {
  return (
    <div className={cx('empty-cart')}>
      <img src={basketImage} alt="Empty basket" />
      <span>Your cart is empty</span>
    </div>
  );
}
