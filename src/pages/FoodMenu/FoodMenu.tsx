import classNames from 'classnames/bind';
import { ReactElement, useState } from 'react';
import { Tab } from '../../components/Tab';
import { WeekDay } from './FoodMenu.types';
import { MealSearch } from '../../components/MealSearch';
import { FoodList } from './FoodList';
import styles from './FoodMenu.module.css';

const cx = classNames.bind(styles);

export function FoodMenu(): ReactElement {
  const [selectedDay, setSelectedDay] = useState<WeekDay>('Monday');
  const [mealTitleSearch, setMealTitleSearch] = useState('');

  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div>
      <div className={cx('tab-wrapper')}>
        {dayLabels.map((day) => (
          <Tab
            key={day}
            label={day}
            isActive={selectedDay === day}
            onClick={() => setSelectedDay(day as WeekDay)}
          />
        ))}
      </div>
      <MealSearch
        handleSearch={(title) => {
          setMealTitleSearch(title);
        }}
      />
      <FoodList selectedDay={selectedDay} mealTitleSearch={mealTitleSearch} />
    </div>
  );
}
