import classNames from 'classnames';
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
      <h1>{heading}</h1>
      <h2>{title}</h2>
    </div>
  );
}
