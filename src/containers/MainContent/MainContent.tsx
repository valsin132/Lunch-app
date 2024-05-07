import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { UserCard } from '../../components/UserCard';
import { Footer } from '../../components/Footer';
import { OrderSummary } from '../../components/OrderSummary';
import { OrderSummaryProvider } from '../../helpers/OrderSummaryContext';
import styles from './MainContent.module.css';

const cx = classNames.bind(styles);

export function MainContent() {
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(false);

  return (
    <div className={cx('main-content')}>
      <div className={cx('main-content__sidebar')}>
        <Sidebar />
      </div>
      <div className={cx('main-content__header')}>
        <Header pageType="foodMenu" />
      </div>
      <div
        className={
          isOrderSummaryVisible ? cx('main-content__outlet') : cx('main-content__outlet-full-col')
        }>
        <Outlet />
      </div>
      <div
        className={cx('main-content__aside', {
          'main-content__aside-position': isOrderSummaryVisible,
        })}>
        <UserCard toggleOrderSummary={() => setIsOrderSummaryVisible(true)} />
        <div
          className={cx('main-content__order-summary', {
            'main-content__order-summary-visible': isOrderSummaryVisible,
          })}>
          <OrderSummaryProvider>
            {isOrderSummaryVisible && (
              <OrderSummary
                visibilityHandler={() => {
                  setIsOrderSummaryVisible(false);
                }}
              />
            )}
          </OrderSummaryProvider>
        </div>
      </div>
      <div className={cx('main-content__footer')}>
        <Footer />
      </div>
    </div>
  );
}
