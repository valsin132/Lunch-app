import classNames from 'classnames/bind';
import { ReactElement, useState, useMemo } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { FoodCard } from '../../components/FoodCard';
import { Tab } from '../../components/Tab';
import { Meal, Vendor, Rating, WeekDay } from './FoodMenu.types';
import styles from './FoodMenu.module.css';

const cx = classNames.bind(styles);

export function FoodMenu(): ReactElement {
  const {
    data: vendorsData,
    isLoading: vendorsLoading,
    isError: vendorsError,
  } = useFetchData<Vendor[]>('http://localhost:3002/vendors');
  const {
    data: mealsData,
    isLoading: mealsLoading,
    isError: mealsError,
  } = useFetchData<Meal[]>('http://localhost:3002/meals');
  const {
    data: ratingsData,
    isLoading: ratingsLoading,
    isError: ratingsError,
  } = useFetchData<Rating[]>('http://localhost:3002/ratings');

  const [selectedDay, setSelectedDay] = useState<WeekDay>('Monday');

  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const getVendorName = (vendorId: number) =>
    vendorsData?.find((vendor) => Number(vendor.id) === vendorId)?.name ?? '';

  const filteredMeals = useMemo(() => {
    if (!mealsData) return [];
    return mealsData.filter((meal) => meal.weekDays.includes(selectedDay));
  }, [mealsData, selectedDay]);

  const getRating = (id: number) => {
    const filteredRatings = ratingsData?.filter((rating) => rating.mealId === id) ?? [];
    if (filteredRatings.length > 0) {
      const ratings = filteredRatings.map((rating) => rating.rating.rating);
      const sum = ratings.reduce((total, rating) => total + rating, 0);
      const averageRating = sum / ratings.length;
      return Number(averageRating.toFixed(1));
    }
    return 0;
  };

  if (vendorsLoading || mealsLoading || ratingsLoading) {
    return <p>Loading...</p>;
  }

  if (vendorsError || mealsError || ratingsError) {
    return <p>Error fetching data!</p>;
  }

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
            rating={getRating(Number(meal.id))}
            dishType={meal.dishType}
            onClick={onclick}
          />
        ))}
      </div>
    </div>
  );
}
