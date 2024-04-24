import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import { loginIllustration1 } from '../../utils/imageManager';
import { AuthCard } from './components/AuthCard/AuthCard';
import styles from './Auth.module.css';

const cx = classNames.bind(styles);

export function Auth(): ReactElement {
  return (
    <div className={cx('auth')}>
      <div className={cx('auth__image')}>
        <img src={loginIllustration1} alt="login illustration" />
      </div>
      <div className={cx('auth__container')}>
        <AuthCard />
      </div>
    </div>
  );
}
