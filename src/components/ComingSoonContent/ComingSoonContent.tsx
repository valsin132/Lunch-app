import { ReactElement, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ComingSoonContent.module.css';

const cx = classNames.bind(styles);

const TimeCalculation = (timeDifference: number) => {
  const days = Math.floor(timeDifference / 3600 / 24);
  const remainingSecondsFromDays = timeDifference % (3600 * 24);
  const hours = Math.floor(remainingSecondsFromDays / 3600);
  const remainingSecondsFromHours = remainingSecondsFromDays % 3600;
  const minutes = Math.floor(remainingSecondsFromHours / 60);
  const remainingSeconds = remainingSecondsFromHours % 60;
  return [
    ['Days', days],
    ['Hours', hours],
    ['Mins.', minutes],
    ['Secs.', remainingSeconds],
  ];
};

export function ComingSoonContent(): ReactElement {
  const todayDate = new Date();
  const demoDate = new Date('2025-05-30T16:00');
  const timeDifference = Math.round((demoDate.getTime() - todayDate.getTime()) / 1000);
  const [time, setTime] = useState<number>(timeDifference);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0 || prevTime < 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cx('coming-soon-container')}>
      <div>COMING SOON!</div>
      <img
        className={cx('coming-soon-container__img')}
        src="https://picsum.photos/id/390/480/250"
        alt="Sourcery Academy holidays"
      />
      <div className={cx('timer')}>
        {TimeCalculation(time).map((item) => (
          <div key={item[0]} className={cx('timer__display')}>
            <div>
              <div className={cx('timer__time')}>{item[1].toString().padStart(2, '0')}</div>
              <div> {item[0]}</div>
            </div>
            {item[0] !== 'Secs.' && <div>:</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
