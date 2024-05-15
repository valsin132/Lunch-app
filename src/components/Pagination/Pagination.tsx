import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import { SelectInput, SelectInputOption } from '../SelectInput';
import { ChevronIcon } from '../../utils/iconManager';
import styles from './Pagination.module.css';

const cx = classNames.bind(styles);
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps): ReactElement {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const handleItemsPerPageChange = (option: SelectInputOption | undefined) => {
    if (option) {
      onItemsPerPageChange(option.value);
    }
  };

  const itemsPerPageOptions: SelectInputOption[] = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
  ];

  return (
    <div className={cx('')}>
      <div className={cx('pagination__container')}>
        <div className={cx('pagination__container-select-input')}>
          <p>Rows per page:</p>
          <SelectInput
            options={itemsPerPageOptions}
            isBoxShadowDisabled
            isSelectListTop
            value={itemsPerPageOptions.find((option) => option.value === itemsPerPage)}
            onChange={handleItemsPerPageChange}
          />
        </div>
        <span>{`${currentPage} of ${totalPages}`}</span>
        <div>
          <button
            type="button"
            className={cx('pagination__button', 'pagination__button-left')}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page">
            <ChevronIcon />
          </button>
          <button
            type="button"
            className={cx('pagination__button', 'pagination__button-right')}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page">
            <ChevronIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
