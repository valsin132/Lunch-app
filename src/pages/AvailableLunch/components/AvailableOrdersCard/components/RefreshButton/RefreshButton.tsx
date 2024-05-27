import { useState } from 'react';
import classNames from 'classnames/bind';
import { RestartIcon } from '../../../../../../utils/iconManager';
import { MONTHS } from '../../../../../../constants';
import styles from './RefreshButton.module.css';

const cx = classNames.bind(styles);

export function RefreshButton() {
  const formatTime = (number: number) => (number < 10 ? `0${number}` : number);

  const getDate = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentDay = formatTime(now.getDate());
    const currentHours = formatTime(now.getHours());
    const currentMinutes = formatTime(now.getMinutes());

    return `${currentHours}:${currentMinutes}, ${MONTHS[currentMonth]} ${currentDay}`;
  };

  const [currentDateTime, setCurrentDateTime] = useState(getDate());

  return (
    <div className={cx('date-wrapper')}>
      <p>refreshed</p>
      <p>{currentDateTime}</p>
      <button
        className={cx('date-wrapper__restart-button')}
        type="button"
        aria-label="Refresh"
        onClick={() => setCurrentDateTime(getDate())}>
        <RestartIcon className={cx('date-wrapper__restart-icon')} />
      </button>
    </div>
  );
}
