import classNames from 'classnames/bind';
import { ReactElement, useState, useMemo } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { FoodCard } from '../../components/FoodCard';
import { Tab } from '../../components/Tab';
import { Meal, Vendor, Rating, WeekDay, Users } from './FoodMenu.types';
import { DishDetailsModal, DishInfoProps } from '../../components/DishDetails';
import styles from './FoodMenu.module.css';

const cx = classNames.bind(styles);

// eslint-disable-next-line max-lines-per-function
export function FoodMenu(): ReactElement {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [dishDetails, setDishDetails] = useState<DishInfoProps>({
    vendor: '',
    title: '',
    isVegetarian: false,
    isSpicy: false,
    rating: '',
    description: '',
    price: 0,
    dishType: 'bowl',
    comments: [{ id: 0, comment: '', name: '', surname: '', userIcon: '' }],
  });

  const {
    data: vendorsData,
    isLoading: vendorsLoading,
    isError: vendorsError,
  } = useFetchData<Vendor[]>('http://localhost:3002/vendors');
  const {
    data: mealsData,
    isLoading: mealsLoading,
    isError: mealsError,
  } = useFetchData<Meal[]>('http://localhost:3002/meals');
  const {
    data: ratingsData,
    isLoading: ratingsLoading,
    isError: ratingsError,
  } = useFetchData<Rating[]>('http://localhost:3002/ratings');
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useFetchData<Users[]>('http://localhost:3002/users');

  const [selectedDay, setSelectedDay] = useState<WeekDay>('Monday');

  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const getVendorName = (vendorId: number) =>
    vendorsData?.find((vendor) => Number(vendor.id) === vendorId)?.name ?? '';

  const filteredMeals = useMemo(() => {
    if (!mealsData) return [];
    return mealsData.filter((meal) => meal.weekDays.includes(selectedDay));
  }, [mealsData, selectedDay]);

  const getRating = (id: number) => {
    const filteredRatings = ratingsData?.filter((rating) => rating.mealId === id) ?? [];
    if (filteredRatings.length > 0) {
      const ratings = filteredRatings.map((rating) => rating.rating.rating);
      const sum = ratings.reduce((total, rating) => total + rating, 0);
      const averageRating = sum / ratings.length;
      return averageRating.toFixed(1);
    }
    return 'Not rated';
  };

  const getUser = (id: number) => {
    const user = usersData?.find((users) => Number(users.id) === id);
    return user;
  };

  const getComments = (id: number) => {
    const filteredComments = ratingsData?.filter((rating) => rating.mealId === id) ?? [];
    if (filteredComments.length > 0) {
      const comments = filteredComments.map((rating) => ({
        comment: rating.rating.comment,
        user: rating.rating.userId,
      }));
      const getCommentDetails = comments.map((comment, commentId) => {
        const userDetails = getUser(comment.user);
        const fullComment = {
          id: commentId + 1,
          comment: comment.comment,
          name: userDetails?.name,
          surname: userDetails?.surname,
          userIcon: userDetails?.img,
        };
        return fullComment;
      });
      return getCommentDetails;
    }
    return undefined;
  };

  if (vendorsLoading || mealsLoading || ratingsLoading || usersLoading) {
    return <p>Loading...</p>;
  }

  if (vendorsError || mealsError || ratingsError || usersError) {
    return <p>Error fetching data!</p>;
  }

  return (
    <div>
      <div className={cx('tab-wrapper')}>
        {dayLabels.map((day) => (
          <Tab
            key={day}
            label={day}
            isActive={selectedDay === day}
            onClick={() => setSelectedDay(day as WeekDay)}
          />
        ))}
      </div>
      <div className={cx('menu-wrapper')}>
        {filteredMeals.map((meal) => (
          <FoodCard
            key={meal.id}
            vendor={getVendorName(meal.vendorId)}
            title={meal.title}
            description={meal.description}
            price={meal.price}
            vegetarian={meal.vegetarian}
            spicy={meal.spicy}
            rating={getRating(Number(meal.id))}
            dishType={meal.dishType}
            onClick={() => {
              setDishDetails({
                vendor: getVendorName(meal.vendorId),
                title: meal.title,
                description: meal.description,
                price: meal.price,
                isVegetarian: meal.vegetarian,
                isSpicy: meal.spicy,
                rating: getRating(Number(meal.id)),
                dishType: meal.dishType,
                comments: getComments(Number(meal.id)),
              });
              setIsOpenModal(true);
            }}
          />
        ))}
      </div>
      <div>
        {isOpenModal && (
          <DishDetailsModal
            vendor={dishDetails.vendor}
            title={dishDetails.title}
            description={dishDetails.description}
            price={dishDetails.price}
            isVegetarian={dishDetails.isVegetarian}
            isSpicy={dishDetails.isSpicy}
            rating={dishDetails.rating}
            dishType={dishDetails.dishType}
            comments={dishDetails.comments}
            setIsOpen={() => {
              setIsOpenModal(false);
            }}
            onClick={onclick}
          />
        )}
      </div>
    </div>
  );
}
