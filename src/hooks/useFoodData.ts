import { useContext } from 'react';
import { FoodDataContext, FoodDataContextType } from '../helpers/FoodDataContext';

export const useFoodData = (): FoodDataContextType => {
  const context = useContext(FoodDataContext);
  if (!context) {
    throw new Error('useFoodData must be used within an FoodDataProvider');
  }
  return context;
};
