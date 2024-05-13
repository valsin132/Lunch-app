import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import { loginIllustration1 } from '../../utils/imageManager';
import { AuthCard } from './components/AuthCard/AuthCard';
import { Footer } from '../../components/Footer';
import styles from './Auth.module.css';

const cx = classNames.bind(styles);

export function Auth(): ReactElement {
  return (
    <div className={cx('auth')}>
      <div className={cx('auth__content')}>
        <div className={cx('auth__image')}>
          <img
            src={loginIllustration1}
            alt="3D illustration of a man and a woman standing on a platform, thinking about food"
          />
        </div>
        <div className={cx('auth__container')}>
          <AuthCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}
