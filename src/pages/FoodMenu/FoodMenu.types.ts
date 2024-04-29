import { DishType } from '../../components/FoodCard';

export interface MealProps {
  id: string;
  vendorId: number;
  title: string;
  description: string;
  price: number;
  vegetarian: boolean;
  spicy: boolean;
  weekDays: string[];
  dishType: DishType;
}

export interface RatingProps {
  mealId: number;
  rating: {
    userId: number;
    rating: number;
    comment: string;
  };
}

export interface UserProps {
  id: number;
  name: string;
  surname: string;
}

export interface VendorProps {
  id: string;
  name: string;
}
