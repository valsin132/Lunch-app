import classNames from 'classnames/bind';
import { ReactElement, useState } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { FoodCard } from '../../components/FoodCard';
import { Tab } from '../../components/Tab';
import { FoodMenuDataProps } from './FoodMenu.types';
import styles from './FoodMenu.module.css';

const cx = classNames.bind(styles);

export function FoodMenu(): ReactElement {
  const { data, isLoading, isError } = useFetchData<FoodMenuDataProps>('../../../data/db.json');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return <p>Error fetching data!</p>;
  }

  const { meals, vendors, ratings } = data;

  const mealRatings: number[] = [];

  const getRating = (id: number) => {
    const findRating = ratings.find((rating) => rating.mealId === id);
    if (findRating) {
      const ratingValue = findRating.rating.rating;
      mealRatings.push(ratingValue);
      const sum = mealRatings.reduce((total, rating) => total + rating, 0);
      const averageRating = sum / mealRatings.length || 0;
      return Number(averageRating.toFixed(1));
    }
    return 0;
  };

  const handleTabClick = (day: string) => {
    setSelectedDay(day);
  };

  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filteredMeals = meals.filter((meal) => meal.weekDays.includes(selectedDay));

  const getVendorName = (vendorId: number) => {
    const findVendor = vendors.find((vendor) => vendor.id === vendorId);
    return findVendor ? findVendor.name : 'Unknown Vendor';
  };

  return (
    <div>
      <div className={cx('tab-wrapper')}>
        {dayLabels.map((day) => (
          <Tab
            key={day}
            label={day}
            isActive={selectedDay === day}
            onClick={() => handleTabClick(day)}
          />
        ))}
      </div>
      <div className={cx('menu-wrapper')}>
        {filteredMeals.map((meal) => (
          <FoodCard
            key={meal.id}
            vendor={getVendorName(meal.vendorId)}
            title={meal.title}
            description={meal.description}
            price={meal.price}
            vegetarian={meal.vegetarian}
            spicy={meal.spicy}
            rating={getRating(meal.id)}
            dishType={meal.dishType}
            onClick={onclick}
          />
        ))}
      </div>
    </div>
  );
}
