import { ReactElement, useState } from 'react';
import classNames from 'classnames/bind';
import { ChevronIcon } from '../../utils/iconManager';
import styles from './SelectInput.module.css';

const cx = classNames.bind(styles);

type SelectInputOption = {
  name: string;
  id: number;
};

interface SelectInputProps {
  options: SelectInputOption[];
  value: SelectInputOption | undefined;
  title: string;
  label: string;
  onChange: (value: SelectInputOption | undefined) => void;
}

export function SelectInput({
  options,
  title,
  value,
  label,
  onChange,
}: SelectInputProps): ReactElement {
  const [isOpen, setisOpen] = useState(false);

  function selectOption(option: SelectInputOption) {
    if (value === option) {
      onChange(undefined);
    } else onChange(option);
  }

  function isOptionSelected(option: SelectInputOption) {
    return option === value;
  }

  return (
    <div className={cx('dropdown-container')}>
      <p className={cx('dropdown-container__label')}>{label}</p>
      <div
        tabIndex={0}
        role="button"
        onKeyDown={() => setisOpen((prev) => !prev)}
        className={cx('dropdown-container__title', {
          'dropdown-container__title--selected': isOpen,
        })}
        onClick={() => setisOpen((prev) => !prev)}>
        <p className={cx('dropdown-container__title--text')}>
          {typeof value === 'undefined' ? title : value.name}
        </p>
        <ChevronIcon className={cx({ 'dropdown-container__icon--rotated': isOpen })} />
      </div>
      {isOpen && (
        <div className={cx('dropdown-container__list')}>
          {options.map((option) => (
            <button
              type="button"
              className={cx('dropdown-container__list-item', {
                'dropdown-container__list-item--selected': isOptionSelected(option),
              })}
              key={option.id}
              value={option.name}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
              }}>
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
