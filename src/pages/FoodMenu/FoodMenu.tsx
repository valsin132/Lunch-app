import classNames from 'classnames/bind';
import { useState } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { FoodCard } from '../../components/FoodCard';
import { Tab } from '../../components/Tab';
import styles from './FoodMenu.module.css';

const cx = classNames.bind(styles);

interface MealProps {
  id: number;
  vendorId: number;
  title: string;
  description: string;
  price: number;
  vegetarian: boolean;
  spicy: boolean;
  weekDays: string[];
  dishType: string;
}

interface RatingProps {
  mealId: number;
  rating: number;
}

interface VendorProps {
  id: number;
  name: string;
}

interface FoodMenuDataProps {
  meals: MealProps[];
  vendors: VendorProps[];
  ratings: RatingProps[];
}

export function FoodMenu() {
  const { data, isLoading, isError } = useFetchData<FoodMenuDataProps>('../../../data/db.json');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return <p>Error fetching data!</p>;
  }

  const { meals, vendors } = data;

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
      <div className={cx('auth-card__header')}>
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
            rating={meal.rating}
            dishType={meal.dishType}
            onClick={onclick}
          />
        ))}
      </div>
    </div>
  );
}
