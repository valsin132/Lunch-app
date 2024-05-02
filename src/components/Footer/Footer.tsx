import classNames from 'classnames/bind';
import styles from './Footer.module.css';

const cx = classNames.bind(styles);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className={cx('footer')}>
      <ul className={cx('footer__container')}>
        <li>Sourcery Academy</li>
        <li>Lunch App</li>
        <li>&copy; {currentYear} Cognizant</li>
      </ul>
    </div>
  );
}
