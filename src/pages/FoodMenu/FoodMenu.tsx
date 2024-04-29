import classNames from 'classnames/bind';
import { ReactElement, useState } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { FoodCard } from '../../components/FoodCard';
import { Tab } from '../../components/Tab';
import { MealProps, VendorProps, RatingProps } from './FoodMenu.types';
import styles from './FoodMenu.module.css';

const cx = classNames.bind(styles);

export function FoodMenu(): ReactElement {
  const {
    data: vendorsData,
    isLoading: vendorsLoading,
    isError: vendorsError,
  } = useFetchData<VendorProps[]>('http://localhost:3002/vendors');
  const {
    data: mealsData,
    isLoading: mealsLoading,
    isError: mealsError,
  } = useFetchData<MealProps[]>('http://localhost:3002/meals');
  const {
    data: ratingsData,
    isLoading: ratingsLoading,
    isError: ratingsError,
  } = useFetchData<RatingProps[]>('http://localhost:3002/ratings');

  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  if (vendorsLoading || mealsLoading || ratingsLoading) {
    return <p>Loading...</p>;
  }

  if (vendorsError || mealsError || ratingsError || !vendorsData || !mealsData || !ratingsData) {
    return <p>Error fetching data!</p>;
  }

  const handleTabClick = (day: string) => {
    setSelectedDay(day);
  };

  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const getVendorName = (vendorId: number) => {
    const findVendor = vendorsData.find((vendor) => Number(vendor.id) === vendorId);
    return findVendor ? findVendor.name : 'Unknown Vendor';
  };

  const filteredMeals = mealsData
    ? mealsData.filter((meal) => meal.weekDays.includes(selectedDay))
    : [];

  const mealRatings: number[] = [];
  const getRating = (id: number) => {
    const filteredRatings = ratingsData ? ratingsData.filter((rating) => rating.mealId === id) : [];
    if (filteredRatings.length > 0) {
      filteredRatings.forEach((rating) => {
        mealRatings.push(rating.rating.rating);
      });
      const sum = mealRatings.reduce((total, rating) => total + rating, 0);
      const averageRating = sum / mealRatings.length || 0;
      return Number(averageRating.toFixed(1));
    }
    return 0;
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
            rating={getRating(Number(meal.id))}
            dishType={meal.dishType}
            onClick={onclick}
          />
        ))}
      </div>
    </div>
  );
}
