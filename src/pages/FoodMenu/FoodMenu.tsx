import classNames from 'classnames/bind';
import { ReactElement, useState, useMemo } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { FoodCard } from '../../components/FoodCard';
import { Tab } from '../../components/Tab';
import { Meal, Vendor, Rating, WeekDay, Order } from './FoodMenu.types';
import { MealSearch } from '../../components/MealSearch';
import styles from './FoodMenu.module.css';

const cx = classNames.bind(styles);

// eslint-disable-next-line max-lines-per-function
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
  const [mealTitleSearch, setMealTitleSearch] = useState('');

  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const isMealOrdered = useMemo(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const { orders } = JSON.parse(storedData);
      return orders.filter((order: Order) => order.weekDay === selectedDay)?.length > 0;
    }
    return false;
  }, [selectedDay]);

  const getVendorName = (vendorId: number) =>
    vendorsData?.find((vendor) => Number(vendor.id) === vendorId)?.name ?? '';

  const filteredMeals = useMemo(() => {
    if (!mealsData) return [];
    let filteredMealData = mealsData.filter((meal) => meal.weekDays.includes(selectedDay));
    if (mealTitleSearch) {
      filteredMealData = filteredMealData.filter((meal) =>
        meal.title.toLowerCase().includes(mealTitleSearch.toLowerCase())
      );
    }
    return filteredMealData;
  }, [mealsData, selectedDay, mealTitleSearch]);

  const noMealsFound = !filteredMeals.length;

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
      <MealSearch
        handleSearch={(title) => {
          setMealTitleSearch(title);
        }}
      />
      <div className={cx('menu-wrapper')}>
        {noMealsFound || isMealOrdered ? (
          <div className={cx('menu-wrapper__no-results')}>
            No results found or You have already ordered meals for {selectedDay}
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
