import { ReactElement, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ComingSoonContent.module.css';

const cx = classNames.bind(styles);

export function ComingSoonContent(): ReactElement {
  const [remainingTime, setRemainingTime] = useState(10);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => {
        if (prevRemainingTime <= 1) {
          clearInterval(timerInterval);
        }
        return prevRemainingTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <div className={cx('coming-soon-container')}>
      <div>COMING SOON</div>
      <div>{remainingTime}</div>
    </div>
  );
}
