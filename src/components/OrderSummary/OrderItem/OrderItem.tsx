import { DishType } from '../../FoodCard';

export type Order = {
  dishType: DishType;
  vendor: string;
  title: string;
  price: number;
  mealId: number;
};

type OrderItemProps = {
  details: Order;
};

export function OrderItem({ details }: OrderItemProps) {
  const handleItemRemoval = () => {
    alert(`removing item ${details.mealId}`);
  };

  return (
    <article>
      <div>{JSON.stringify(details)}</div>
      <button type="button" onClick={handleItemRemoval}>
        Remove
      </button>
    </article>
  );
}
