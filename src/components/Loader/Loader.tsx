import classNames from 'classnames/bind';
import { LogoHorizontal } from '../../utils/iconManager';
import styles from './Loader.module.css';

const cx = classNames.bind(styles);

type LoaderProps = {
  isHidden?: boolean;
};

export function Loader({ isHidden }: LoaderProps) {
  return (
    <div className={cx('loader', { 'loader--hidden': isHidden })}>
      <div className={cx('loader__logo')}>
        <div className={cx('loader__background')}>
          <LogoHorizontal />
        </div>
      </div>
    </div>
  );
}
