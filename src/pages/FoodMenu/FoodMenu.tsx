import classNames from 'classnames/bind';
import { ReactElement, useState, useMemo, useEffect } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { FoodCard } from '../../components/FoodCard';
import { Tab } from '../../components/Tab';
import { Meal, Vendor, Rating, WeekDay, UserData, Order } from './FoodMenu.types';
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
  const [userData, setUserData] = useState<UserData | null>(null);

  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  const { orders } = userData || {};
  const isMealOrdered =
    (orders || []).filter((order: Order) => order.weekDay === selectedDay)?.length > 0;

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
      return averageRating.toFixed(1);
    }
    return 'Not rated';
  };

  if (vendorsLoading || mealsLoading || ratingsLoading || !orders) {
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
        {isMealOrdered ? (
          <div className={cx('menu-wrapper__meal-ordered')}>
            You have already chosen meals for {selectedDay}.
          </div>
        ) : (
          filteredMeals.map((meal) => (
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
          ))
        )}
      </div>
    </div>
  );
}
