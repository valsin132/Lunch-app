import { DishType } from './FoodCard.types';
import {
  kebabImage,
  soupImage,
  pizzaImage,
  sandwichImage,
  burgerImage,
  logoWithoutText,
} from '../../utils/imageManager';

export const getDishTypeImage = (dishType: DishType): string => {
  switch (dishType) {
    case 'wrap':
      return kebabImage;
    case 'soup':
      return soupImage;
    case 'pizza':
      return pizzaImage;
    case 'sandwich':
      return sandwichImage;
    case 'burger':
      return burgerImage;
    case 'bowl':
      return soupImage;
    default:
      return logoWithoutText;
  }
};
