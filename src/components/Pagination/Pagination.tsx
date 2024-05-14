import { ReactElement, useState } from 'react';
// import classNames from 'classnames/bind';
// import styles from './Pagination.module.css';
import { SelectInput, SelectInputOption } from '../SelectInput';

interface PaginationProps {
  items: string[];
}

export function Pagination({ items }: PaginationProps): ReactElement {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const options: SelectInputOption[] = [
    {
      label: '10',
      value: 10,
    },
    {
      label: '20',
      value: 20,
    },
    {
      label: '30',
      value: 30,
    },
  ];

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handleItemsPerPageChange = (option: SelectInputOption | undefined) => {
    if (option) {
      setItemsPerPage(option.value);
      setCurrentPage(1);
    }
  };

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  return (
    <div>
      <div>
        {currentItems.map((item) => (
          <div>{item}</div>
        ))}
      </div>
      <SelectInput
        label="Rows per page:"
        options={options}
        value={options.find((option) => option.value === itemsPerPage)}
        isBoxShadowDisabled
        onChange={handleItemsPerPageChange}
      />
      <div>
        <span>{`${currentPage} of ${totalPages}`}</span>
        <button type="button" onClick={handlePrev} disabled={currentPage === 1}>
          {'<'}
        </button>
        <button type="button" onClick={handleNext} disabled={currentPage === totalPages}>
          {'>'}
        </button>
      </div>
    </div>
  );
}
