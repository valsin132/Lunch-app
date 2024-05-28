import { Users } from '../../pages/FoodMenu/FoodMenu.types';

export const getUsers =
  (usersData: Users[] | null) =>
  (id: number): Users | undefined =>
    usersData?.find((user) => Number(user.id) === id);
