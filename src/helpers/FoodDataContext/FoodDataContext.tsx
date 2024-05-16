import { ReactNode, createContext, useMemo } from 'react';
import { Meal, Rating, Vendor, Users } from '../../pages/FoodMenu/FoodMenu.types';
import { useFetchData } from '../../hooks/useFetchData';

export interface FoodDataContextType {
  isLoading: boolean;
  isError: boolean;
  vendorsData: Vendor[] | null;
  mealsData: Meal[] | null;
  ratingsData: Rating[] | null;
  usersData: Users[] | null;
}

const initialFoodData: FoodDataContextType = {
  isError: false,
  isLoading: true,
  vendorsData: null,
  mealsData: null,
  ratingsData: null,
  usersData: null,
};

interface FoodDataProviderProps {
  children: ReactNode;
}

export const FoodDataContext = createContext<FoodDataContextType>(initialFoodData);

export function FoodDataProvider({ children }: FoodDataProviderProps) {
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

  const foodData: FoodDataContextType = useMemo(
    () => ({
      vendorsData,
      mealsData,
      ratingsData,
      usersData,
      isError,
      isLoading,
    }),
    [vendorsData, mealsData, ratingsData, usersData, isError, isLoading]
  );
  return <FoodDataContext.Provider value={foodData}>{children}</FoodDataContext.Provider>;
}
