import { ReactElement, useState } from 'react';
import classNames from 'classnames/bind';
import { ChevronIcon } from '../../utils/iconManager';
import styles from './SelectInput.module.css';

const cx = classNames.bind(styles);

type SelectInputOption = {
  name: string;
  id: string;
};

interface SelectInputProps {
  isSelected?: boolean;
  options: SelectInputOption[];
  title: string;
  label: string;
  onClick: () => void;
}

export function SelectInput({
  options,
  title,
  label,
  isSelected,
  onClick,
}: SelectInputProps): ReactElement {
  const [isOpen, setisOpen] = useState(false);

  return (
    <div className={cx('dropdown-container')}>
      <p className={cx('dropdown-container__label')}>{label}</p>
      <div
        tabIndex={0}
        role="button"
        onKeyDown={onClick}
        className={cx('dropdown-container__title')}
        onClick={() => setisOpen((prev) => !prev)}>
        <p className={cx('dropdown-container__title--text')}>{title}</p>
        <ChevronIcon className={cx({ 'dropdown-container__icon--rotated': isOpen })} />
      </div>
      {isOpen && (
        <div className={cx('dropdown-container__list')}>
          {options.map((option) => (
            <button
              type="button"
              className={cx('dropdown-container__list-item', {
                'dropdown-container__list-item--selected': isSelected,
              })}
              key={option.id}
              value={option.name}
              onClick={onClick}>
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
