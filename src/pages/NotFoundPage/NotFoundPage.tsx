import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button } from '../../components/Button';
import { Footer } from '../../components/Footer';
import styles from './NotFoundPage.module.css';

const cx = classNames.bind(styles);

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={cx('not-found-page__wrapper')}>
      <div className={cx('not-found-page__content')}>
        <h2 className={cx('not-found-page__header')}>Oops!</h2>
        <p>Page not found!</p>
        <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
        <Button
          title="Go to Home page"
          buttonType="primary"
          buttonSize="md"
          aria-label="go to home page"
          onClick={() => navigate('/')}
        />
      </div>
      <Footer />
    </div>
  );
}
