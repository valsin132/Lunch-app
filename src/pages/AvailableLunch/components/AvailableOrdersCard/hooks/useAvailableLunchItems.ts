import { useMemo, useCallback } from 'react';
import { useFoodData } from '../../../../../hooks/useFoodData';
import { useFetchData } from '../../../../../hooks/useFetchData';
import { DishType } from '../../../../../components/FoodCard/FoodCard.types';
import { getVendorName } from '../../../../../helpers/helperFunctions/getVendorName';
import { getUsers } from '../../../../../helpers/helperFunctions/getUsers';

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
    isLoading: paginationItemsLoading,
    isError: paginationItemsError,
  } = useFetchData<AvailableLunch[]>('http://localhost:3002/availableLunch');

  const isLoading = foodDataLoading || paginationItemsLoading;
  const isError = foodDataError || paginationItemsError;

  const getVendorNameCallback = useCallback(getVendorName(vendorsData), [vendorsData]);

  const getUserCallback = useCallback(getUsers(usersData), [usersData]);

  const getAvailableDish = useCallback(
    (ids: number[]) =>
      ids
        .map((mealId) => {
          const mealItem = mealsData?.find((meal) => Number(meal.id) === mealId);
          if (mealItem) {
            return {
              title: mealItem.title,
              dishType: mealItem.dishType,
              vendor: getVendorNameCallback(mealItem.vendorId),
            };
          }
          return null;
        })
        .filter((meal) => meal !== null) as { title: string; dishType: DishType; vendor: string }[],
    [mealsData, getVendorNameCallback]
  );

  const availableOrders = useMemo(
    () =>
      availableLunchData?.map((lunch) => ({
        user: getUserCallback(lunch.userId),
        meals: getAvailableDish(lunch.mealIds),
      })) ?? [],
    [availableLunchData, getUserCallback, getAvailableDish]
  );

  return {
    availableOrders,
    isLoading,
    isError,
  };
};
