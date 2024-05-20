import classNames from 'classnames/bind';
import { ComingSoonContent } from '../../components/ComingSoonContent';
import styles from './Rating.module.css';

const cx = classNames.bind(styles);

export function Ratings() {
  return (
    <main className={cx('rating-container')}>
      <ComingSoonContent />
    </main>
  );
}
