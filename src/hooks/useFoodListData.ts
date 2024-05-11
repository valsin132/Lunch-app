import { useMemo } from 'react';
import { Meal, Rating, Vendor, Users } from '../pages/FoodMenu/FoodMenu.types';
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
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useFetchData<Users[]>('http://localhost:3002/users');

  const isLoading = useMemo(
    () => vendorsLoading || mealsLoading || ratingsLoading || usersLoading,
    [vendorsLoading, mealsLoading, ratingsLoading, usersLoading]
  );

  const isError = useMemo(
    () => vendorsError || mealsError || ratingsError || usersError,
    [vendorsError, mealsError, ratingsError, usersError]
  );

  return { vendorsData, mealsData, ratingsData, usersData, isLoading, isError };
};
