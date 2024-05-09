import { useMemo } from 'react';
import { Meal, Rating, Vendor } from '../pages/FoodMenu/FoodMenu.types';
import { useFetchData } from './useFetchData';

export const useFoodListData = () => {
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

  const isLoading = useMemo(
    () => vendorsLoading || mealsLoading || ratingsLoading,
    [vendorsLoading, mealsLoading, ratingsLoading]
  );

  const isError = useMemo(
    () => vendorsError || mealsError || ratingsError,
    [vendorsError, mealsError, ratingsError]
  );

  return { vendorsData, mealsData, ratingsData, isLoading, isError };
};
