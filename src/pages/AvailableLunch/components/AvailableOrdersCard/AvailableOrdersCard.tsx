import { useState } from 'react';
import classNames from 'classnames/bind';
import { RefreshButton } from './components/RefreshButton';
import { Card } from '../../../../components/Card';
import { Pagination } from './components/Pagination';
import { AvailableOrdersItem, OrderItem } from './components/AvailableOrdersItem';
import styles from './AvailableOrdersCard.module.css';

const cx = classNames.bind(styles);

export function AvailableOrdersCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const items: OrderItem[] = [
    {
      img: 'https://lh3.googleusercontent.com/pw/AP1GczPd86eTOZysL0WAf9veGe6WIkEfvgX2zA1gKY65ylS64iQW5kK7ppYKO8uUBJkQZh5UNxDN-E9aJgvQFsS28YzQHREL4rU5_2TXUKd0xjZTd7tu8fCMKANM28tMIHhyD3KnhvA_s0gcvbkK447oLT9E=w611-h321-s-no-gm',
      name: 'Burton',
      surname: 'Whitaker',
      orders: [{ dishType: 'burger', title: 'Tasty happy meal', vendor: 'McDonalds' }],
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const getCurrentPageItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  };

  const currentItems = getCurrentPageItems();

  return currentItems.length > 0 ? (
    <div className={cx('available-lunch')}>
      <Card shadow="s">
        <div className={cx('available-lunch__container')}>
          <div className={cx('available-lunch__header')}>
            <h2 className={cx('available-lunch__header-heading')}>Available Orders</h2>
            <RefreshButton />
          </div>
          <table className={cx('available-lunch__table')}>
            <thead>
              <tr className={cx('available-lunch__table-header')}>
                <th>Order Summary</th>
                <th>Vendor</th>
                <th>Take It From</th>
              </tr>
            </thead>
            <tbody className={cx('available-lunch__table-body')}>
              {currentItems.map((item) => (
                <AvailableOrdersItem
                  key={item.name + item.orders[0].title}
                  img={item.img}
                  name={item.name}
                  orders={item.orders}
                  surname={item.surname}
                  onClick={() => {
                    alert('reserved');
                  }}
                />
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </Card>
    </div>
  ) : (
    <div className={cx('available-lunch__empty-lunch-text')}>No available lunches</div>
  );
}
