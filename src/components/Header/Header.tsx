import classNames from 'classnames/bind';
import { ReactElement } from 'react';
import styles from './Header.module.css';

const cx = classNames.bind(styles);

interface HeaderProps {
  title: string;
  subtitle: string;
  isDate?: boolean;
}

export function Header({ title, subtitle, isDate }: HeaderProps): ReactElement {
  const getDate = () => {
    const curr = new Date();

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const firstDayDate = new Date(curr.setDate(curr.getDate() - (curr.getDay() || 7) + 1));
    const lastDayDate = new Date(curr.setDate(curr.getDate() - (curr.getDay() || 7) + 1 + 4));

    const firstDayMonth = firstDayDate.getMonth();
    const firstDay = firstDayDate.getDate().toLocaleString();
    const lastDayMonth = lastDayDate.getMonth();
    const lastDay = lastDayDate.getDate().toLocaleString();

    const dateDisplayed = `${firstDay} ${months[firstDayMonth]} - ${lastDay} ${months[lastDayMonth]}`;

    return dateDisplayed;
  };

  return (
    <div className={cx('header')}>
      <h1 className={cx('header__title')}>{title}</h1>
      {isDate ? (
        <p className={cx('header__subtitle')}>
          {subtitle} {getDate()}
        </p>
      ) : (
        <p className={cx('header__subtitle')}>{subtitle}</p>
      )}
    </div>
  );
}
