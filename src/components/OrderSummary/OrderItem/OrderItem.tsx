type DishType = 'wrap' | 'soup' | 'pizza' | 'sandwich' | 'burger' | 'bowl';

export type Order = {
  dishType: DishType;
  vendor: string;
  title: string;
  price: number;
  mealId: number;
};

type OrderItemProps = {
  onRemove?: () => void;
  details: Order;
};

export function OrderItem({ details, onRemove }: OrderItemProps) {
  return (
    <article>
      <div>{JSON.stringify(details)}</div>
      <button type="button" onClick={onRemove}>
        Remove
      </button>
    </article>
  );
}
