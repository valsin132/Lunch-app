import { useMemo, useCallback } from 'react';
import { useFoodData } from '../../../../../hooks/useFoodData';
import { useFetchData } from '../../../../../hooks/useFetchData';
import { DishType } from '../../../../../components/FoodCard/FoodCard.types';

interface AvailableLunch {
  userId: number;
  mealIds: number[];
}
export const usePaginationItems = () => {
  const { mealsData, vendorsData, usersData } = useFoodData();
  const {
    data: availableLunchData,
    isLoading: paginationItemsLoading,
    isError: paginationItemsError,
  } = useFetchData<AvailableLunch[]>('http://localhost:3002/availableLunch');
  const getUsers = useCallback(
    (id: number) => usersData?.find((user) => Number(user.id) === id) || null,
    [usersData]
  );
  const getVendorName = useCallback(
    (vendorId: number) => vendorsData?.find((vendor) => Number(vendor.id) === vendorId)?.name ?? '',
    [vendorsData]
  );
  const getAvailableDish = useCallback(
    (ids: number[]) =>
      ids
        .map((mealId) => {
          const mealItem = mealsData?.find((meal) => Number(meal.id) === mealId);
          if (mealItem) {
            return {
              title: mealItem.title,
              dishType: mealItem.dishType,
              vendor: getVendorName(mealItem.vendorId),
            };
          }
          return null;
        })
        .filter((meal) => meal !== null) as { title: string; dishType: DishType; vendor: string }[],
    [mealsData, getVendorName]
  );
  const getPaginationItems = useMemo(
    () =>
      availableLunchData?.map((lunch) => ({
        user: getUsers(lunch.userId),
        meals: getAvailableDish(lunch.mealIds),
      })) ?? [],
    [availableLunchData, getUsers, getAvailableDish]
  );
  return {
    getPaginationItems,
    paginationItemsLoading,
    paginationItemsError,
  };
};
