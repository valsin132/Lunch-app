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
  return currentItems.length > 0 ? (
    <div className={cx('available-lunch')}>
      <Card>
        <div className={cx('available-lunch__container')}>
          <div className={cx('available-lunch__header')}>
            <h2 className={cx('available-lunch__header-heading')}>Available Orders</h2>
            <RefreshButton />
          </div>
          <table>
            <thead>
              <tr className={cx('available-lunch__table-header')}>
                <th className={cx('available-lunch__head-text')}>Order Summary</th>
                <th className={cx('available-lunch__head-text')}>Vendor</th>
                <th className={cx('available-lunch__head-text')}>Take It From</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.test}</td>
                </tr>
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
