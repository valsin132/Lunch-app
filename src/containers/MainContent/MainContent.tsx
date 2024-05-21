import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Sidebar } from '../../components/Sidebar';
import { Header, PageTypes } from '../../components/Header';
import { UserCard } from '../../components/UserCard';
import { Footer } from '../../components/Footer';
import { OrderSummary } from '../../components/OrderSummary';
import styles from './MainContent.module.css';

const cx = classNames.bind(styles);

const getPageTypeFromPath = (pathname: string): PageTypes => {
  if (pathname.includes('menu')) return 'foodMenu';
  if (pathname.includes('lunches')) return 'availableLunch';
  if (pathname.includes('orders')) return 'yourOrders';
  return 'ratings';
};

export function MainContent() {
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(false);
  const location = useLocation();
  const pageType = getPageTypeFromPath(location.pathname);

  return (
    <div className={cx('main-content')}>
      <aside className={cx('main-content__sidebar')}>
        <Sidebar />
      </aside>
      <header className={cx('main-content__header')}>
        <Header pageType={pageType} />
      </header>
      <main
        className={
          isOrderSummaryVisible ? cx('main-content__outlet') : cx('main-content__outlet-full-col')
        }>
        <Outlet />
      </main>
      <aside
        className={cx('main-content__aside', {
          'main-content__aside-position': isOrderSummaryVisible,
        })}>
        <UserCard toggleOrderSummary={() => setIsOrderSummaryVisible(true)} />
        {isOrderSummaryVisible && (
          <div className={cx('main-content__order-summary')}>
            <OrderSummary
              visibilityHandler={() => {
                setIsOrderSummaryVisible(false);
              }}
            />
          </div>
        )}
      </aside>
      <footer className={cx('main-content__footer')}>
        <Footer />
      </footer>
    </div>
  );
}
