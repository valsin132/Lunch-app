import { ReactElement, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Card } from '../Card';
import { BadgeCount } from '../Badge';
import { ShoppingBasketIcon, Logout, ArrowFilledIcon } from '../../utils/iconManager';
import { useAuth } from '../../helpers/AuthContext';
import styles from './UserCard.module.css';

const cx = classNames.bind(styles);

interface UserData {
  userName: string;
  password: string;
  name: string;
  surname: string;
  balance: number;
  img: string;
  orders: {
    weekDay: string;
    mealIds: number[];
  }[];
}

interface UserCardProps {
  toggleOrderSummary: () => void;
}

export function UserCard({ toggleOrderSummary }: UserCardProps): ReactElement {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData: UserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { name, surname, balance, img, orders } = userData;
  const numberOfOrders = orders.length;

  const handleArrowButtonClick = () => {
    setShowLogoutButton(!showLogoutButton);
  };

  return (
    <Card spacing="2xs" shadow="s" roundedCorners="left" isNoBorder>
      <div className={cx('user-card__layout')}>
        <div className={cx('user-card__header')}>
          <div className={cx('user-card__avatar-container')}>
            <img src={img} alt="profile avatar" className={cx('user-card__avatar')} />
            <button
              type="button"
              onClick={handleArrowButtonClick}
              aria-label="Toggle Logout Button">
              <ArrowFilledIcon
                className={cx('user-card__button-arrow', {
                  'user-card__button-arrow-rotated': showLogoutButton,
                })}
              />
            </button>
            {showLogoutButton && (
              <button type="button" className={cx('user-card__logout-button')} onClick={logout}>
                <span className={cx('user-card__logout-text')}>
                  {' '}
                  <Logout className={cx('user-card__logout-icon')} />
                  Log Out
                </span>
              </button>
            )}
          </div>
          <p>
            {name} {surname}
          </p>
        </div>
        <div className={cx('user-card__content')}>
          <div className={cx('user-card__content-balance')}>
            <span>Balance</span>
            <span>&euro;{balance}</span>
          </div>
          <button
            type="button"
            className={cx('user-card__logout-button')}
            aria-labelledby="orderSummaryLabel"
            onClick={toggleOrderSummary}>
            <ShoppingBasketIcon />
            {numberOfOrders > 0 && (
              <span className={cx('user-card__badge')}>
                <BadgeCount count={numberOfOrders} />
              </span>
            )}
          </button>
        </div>
      </div>
    </Card>
  );
}
