import { useState } from 'react';
import classNames from 'classnames/bind';
import { RestartIcon } from '../../../utils/iconManager';
import styles from './RefreshButton.module.css';

const cx = classNames.bind(styles);

export function RefreshButton() {
  function getDate() {
    const now = new Date();
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
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    return `${currentHours}:${currentMinutes}, ${months[currentMonth]} ${currentDay}`;
  }

  const [currentDateTime, setCurrentDateTime] = useState(getDate());

  function handleClick() {
    setCurrentDateTime(getDate());
  }

  return (
    <div className={cx('date-wrapper')}>
      <p>refreshed</p>
      <p>{currentDateTime}</p>
      <button
        className={cx('date-wrapper__restart-button')}
        type="button"
        aria-label="Refresh"
        onClick={handleClick}>
        <RestartIcon className={cx('date-wrapper__restart-icon')} />
      </button>
    </div>
  );
}
