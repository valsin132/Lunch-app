import classNames from 'classnames/bind';
import { ReactElement } from 'react';
import styles from './Header.module.css';

const cx = classNames.bind(styles);

interface HeaderProps {
  heading: string;
  title: string;
}

export function Header({ heading, title }: HeaderProps): ReactElement {
  return (
    <div className={cx('header')}>
      <h1 className={cx('header__heading')}>{heading}</h1>
      <p className={cx('header__title')}>{title}</p>
    </div>
  );
}
