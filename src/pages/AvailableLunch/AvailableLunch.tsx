import { AvailableOrdersItem } from '../../components/AvailableOrdersItem';

export function AvailableLunch() {
  // const dumbData = [
  //   {
  //     user: {
  //       id: 1,
  //       name: 'Burton',
  //       surname: 'Whitaker',
  //       img: 'https://lh3.googleusercontent.com/pw/AP1GczPd86eTOZysL0WAf9veGe6WIkEfvgX2zA1gKY65ylS64iQW5kK7ppYKO8uUBJkQZh5UNxDN-E9aJgvQFsS28YzQHREL4rU5_2TXUKd0xjZTd7tu8fCMKANM28tMIHhyD3KnhvA_s0gcvbkK447oLT9E=w611-h321-s-no-gm',
  //     },
  //     mealIds: [
  //       {
  //         id: 2,
  //         vendorId: 1,
  //         title: 'Creamy Tomato Basil Soup',
  //         description: 'Tomatoes, fresh basil, and cream, blended to perfection.',
  //         price: 3.49,
  //         ordersCount: 38,
  //         weekDays: ['Friday'],
  //         vegetarian: true,
  //         spicy: false,
  //         mealType: 'soup',
  //         dishType: 'soup',
  //       },
  //       {
  //         id: 3,
  //         vendorId: 1,
  //         title: 'Chicken Alfredo Pasta',
  //         description: 'Grilled chicken, fettuccine pasta, and creamy Alfredo sauce.',
  //         price: 6.5,
  //         ordersCount: 8,
  //         weekDays: ['Monday', 'Wednesday'],
  //         vegetarian: false,
  //         spicy: false,
  //         mealType: 'main',
  //         dishType: 'pasta',
  //       },
  //     ],
  //   },
  // ];
  // const meals = dumbData.map((userMeals) => userMeals.mealIds);
  // console.log(meals);
  return (
    <AvailableOrdersItem
      title="Pho Rice Soup with Chicken"
      vendor="TOTO BISTRO"
      name="Ieva Pievagrybaite"
      img="https://lh3.googleusercontent.com/pw/AP1GczPd86eTOZysL0WAf9veGe6WIkEfvgX2zA1gKY65ylS64iQW5kK7ppYKO8uUBJkQZh5UNxDN-E9aJgvQFsS28YzQHREL4rU5_2TXUKd0xjZTd7tu8fCMKANM28tMIHhyD3KnhvA_s0gcvbkK447oLT9E=w611-h321-s-no-gm"
      dishType="pizza"
      onClick={onclick}
    />
  );
}
