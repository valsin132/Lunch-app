import { useMemo, useCallback } from 'react';
import { useFoodData } from '../../../../../hooks/useFoodData';
import { useFetchData } from '../../../../../hooks/useFetchData';
import { DishType } from '../../../../../components/FoodCard/FoodCard.types';
import { getVendorName } from '../../../../../helpers/helperFunctions/getVendorName';
import { getUser } from '../../../../../helpers/helperFunctions/getUser';

interface AvailableLunch {
  userId: number;
  mealIds: number[];
}

export const useAvailableLunchItems = () => {
  const {
    isLoading: foodDataLoading,
    isError: foodDataError,
    mealsData,
    vendorsData,
    usersData,
  } = useFoodData();

  const {
    data: availableLunchData,
    isLoading: availableLunchDataLoading,
    isError: availableLunchDataError,
  } = useFetchData<AvailableLunch[]>('http://localhost:3002/availableLunch');

  const isLoading = foodDataLoading || availableLunchDataLoading;
  const isError = foodDataError || availableLunchDataError;

  const getAvailableDish = useCallback(
    (ids: number[]) =>
      ids.reduce(
        (acc, mealId) => {
          const mealItem = mealsData?.find((meal) => Number(meal.id) === mealId);
          if (mealItem) {
            acc.push({
              title: mealItem.title,
              dishType: mealItem.dishType,
              vendor: getVendorName(vendorsData, mealItem.vendorId),
            });
          }
          return acc;
        },
        [] as { title: string; dishType: DishType; vendor: string }[]
      ),
    [mealsData, vendorsData]
  );
  const availableOrders = useMemo(
    () =>
      availableLunchData?.map((lunch) => ({
        user: getUser(usersData, lunch.userId),
        meals: getAvailableDish(lunch.mealIds),
      })) ?? [],
    [availableLunchData, usersData, getAvailableDish]
  );

  return {
    availableOrders,
    isLoading,
    isError,
  };
};
