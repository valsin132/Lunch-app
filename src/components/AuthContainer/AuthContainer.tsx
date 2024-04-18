import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import { loginIllustration1 } from '../../utils/imageManager';
import { Auth } from '../Auth/Auth';
import styles from './AuthContainer.module.css';

const cx = classNames.bind(styles);

export function AuthContainer(): ReactElement {
  return (
    <div className={cx('auth')}>
      <div className={cx('auth-image')}>
        <img src={loginIllustration1} alt="login illustration" />
      </div>
      <div className={cx('auth-card')}>
        <Auth />
      </div>
    </div>
  );
}
