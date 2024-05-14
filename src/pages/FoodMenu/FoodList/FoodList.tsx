import { useMemo } from 'react';
import classNames from 'classnames/bind';
import { FoodCard } from '../../../components/FoodCard';
import { Order, WeekDay, Meal } from '../FoodMenu.types';
import { useFoodListData } from '../../../hooks/useFoodListData';
import { useOrderSummary, Workdays } from '../../../helpers/OrderSummaryContext';
import styles from './FoodList.module.css';

interface FoodListProps {
  selectedDay: WeekDay;
  mealTitleSearch: string;
}

const cx = classNames.bind(styles);

export function FoodList({ selectedDay, mealTitleSearch }: FoodListProps) {
  const { vendorsData, mealsData, ratingsData, isLoading, isError } = useFoodListData();
  const orderSummaryContext = useOrderSummary();
  const { orders } = orderSummaryContext;
  const dayToLowerCase = selectedDay.toLowerCase() as Workdays;

  const isMealOrdered = useMemo(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const { orders: storedOrders } = JSON.parse(storedData);
      return storedOrders.filter((order: Order) => order.weekDay === selectedDay)?.length > 0;
    }
    return false;
  }, [selectedDay]);

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

  const noMealsFound = useMemo(() => !filteredMeals.length, [filteredMeals]);

  const getVendorName = (vendorId: number) =>
    vendorsData?.find((vendor) => Number(vendor.id) === vendorId)?.name ?? '';

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

  const isMealTypeAddedForDay = (mealType: string) => {
    const ordersForSelectedDay = orders.find((order) => order.day === dayToLowerCase);
    if (!ordersForSelectedDay) {
      return false;
    }
    return ordersForSelectedDay.orders.some((orderItem) => orderItem.mealType === mealType);
  };

  const handleAddToOrderSummary = (meal: Meal): void => {
    orderSummaryContext.modifyOrders({
      action: 'ADD_ORDER',
      day: dayToLowerCase,
      meal: {
        dishType: meal.dishType,
        mealId: meal.id,
        mealType: meal.mealType,
        price: meal.price,
        title: meal.title,
        vendor: getVendorName(meal.vendorId),
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while retrieving data</div>;

  return (
    <div className={cx('menu-wrapper')}>
      {isMealOrdered || noMealsFound ? (
        <div className={cx('menu-wrapper__empty-meals-text')}>
          {isMealOrdered ? `You have already ordered meals for ${selectedDay}` : 'No results found'}
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
            onClick={() => handleAddToOrderSummary(meal)}
            isDisabled={isMealTypeAddedForDay(meal.mealType)}
          />
        ))
      )}
    </div>
  );
}
