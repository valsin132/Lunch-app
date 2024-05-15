import { useState } from 'react';
import classNames from 'classnames/bind';
import { Pagination } from '../../../../components/Pagination';
import { Card } from '../../../../components/Card';
import { RefreshButton } from '../../../../components/AvailableOrdersTable/components/RefreshButton';
import styles from './AvailableOrdersCard.module.css';

const cx = classNames.bind(styles);

export function AvailableOrdersCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // dumb data
  const items = Array.from({ length: 100 }, (_, index) => ({
    name: `Name${index + 1}`,
    age: Math.floor(Math.random() * 100) + 1,
    test: `Test${index + 1}`,
  }));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={cx('available-lunch')}>
      <Card>
        <div className={cx('available-lunch__container')}>
          <div className={cx('available-lunch__header')}>
            <h3>Available Orders</h3>
            <RefreshButton />
          </div>
          <table className={cx('available-lunch__table')}>
            <tr className={cx('available-lunch__table-header')}>
              <th>Order Summary</th>
              <th>Vendor</th>
              <th>Take It From</th>
            </tr>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.test}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No available orders</td>
              </tr>
            )}
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </Card>
    </div>
  );
}
