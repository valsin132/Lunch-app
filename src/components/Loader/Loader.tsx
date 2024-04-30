import classNames from 'classnames/bind';
import styles from './Loader.module.css';

const cx = classNames.bind(styles);

export function Loader() {
  return <div className={cx('loader')}>Loader</div>;
}
