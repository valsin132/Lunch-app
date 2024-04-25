import { DishType } from '../../components/FoodCard';

export interface MealProps {
  id: number;
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
  id: number;
  name: string;
}

export interface FoodMenuDataProps {
  meals: MealProps[];
  vendors: VendorProps[];
  ratings: RatingProps[];
  users: UserProps[];
}
