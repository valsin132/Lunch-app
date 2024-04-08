import classNames from 'classnames/bind';
import styles from './BadgeFree.module.css';

const cx = classNames.bind(styles);

export function BadgeFree() {
  return (
    <div className={cx('badge')}>
      <p>Free</p>
    </div>
  );
}
