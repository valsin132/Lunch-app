import { Users } from '../../pages/FoodMenu/FoodMenu.types';

export const getUser = (usersData: Users[] | null, id: number): Users | undefined =>
  usersData?.find((user) => Number(user.id) === id);
