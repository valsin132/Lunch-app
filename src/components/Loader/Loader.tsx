import classNames from 'classnames/bind';
import { LogoHorizontal } from '../../utils/iconManager';
import styles from './Loader.module.css';

const cx = classNames.bind(styles);

export function Loader() {
  return (
    <div className={cx('loader')}>
      <div className={cx('loader__logo')}>
        <div className={cx('loader__background')}>
          <LogoHorizontal />
        </div>
      </div>
    </div>
  );
}
