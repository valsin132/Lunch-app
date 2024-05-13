export type DishType = 'wrap' | 'soup' | 'pizza' | 'sandwich' | 'burger' | 'bowl';

export type CommentProps = {
  id?: number;
  userIcon?: string;
  name?: string;
  surname?: string;
  comment?: string;
};

export interface FoodCardProps {
  vendor: string;
  title: string;
  description: string;
  price: number;
  isVegetarian: boolean;
  isSpicy: boolean;
  rating: number | string;
  comments?: CommentProps[];
  dishType: DishType;
  setIsOpen: () => void;
  onClick: () => void;
}
