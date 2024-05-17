import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import { loginIllustration1 } from '../../utils/imageManager';
import { AuthCard } from './components/AuthCard/AuthCard';
import { Footer } from '../../components/Footer';
import styles from './Auth.module.css';

const cx = classNames.bind(styles);

export function Auth(): ReactElement {
  return (
    <main className={cx('auth')}>
      <div className={cx('auth__content')}>
        <figure className={cx('auth__image')}>
          <img
            src={loginIllustration1}
            alt="3D illustration of a man and a woman standing on a platform, thinking about food"
          />
        </figure>
        <section className={cx('auth__container')}>
          <AuthCard />
        </section>
      </div>
      <Footer />
    </main>
  );
}
