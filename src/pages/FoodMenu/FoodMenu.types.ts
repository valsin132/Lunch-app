import { DishType } from '../../components/FoodCard/FoodCard.types';

export interface Meal {
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

export interface Rating {
  mealId: number;
  rating: {
    userId: number;
    rating: number;
    comment: string;
  };
}

export interface Vendor {
  id: string;
  name: string;
}

export interface Users {
  id: string;
  name: string;
  surname: string;
  img: string;
}

export interface Order {
  weekDay: string;
  mealIds: number[];
}

export type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
