import { ReactElement, useState } from 'react';
import classNames from 'classnames/bind';
import { ChevronIcon } from '../../utils/iconManager';
import styles from './SelectInput.module.css';

const cx = classNames.bind(styles);

type SelectInputOption = {
  label: string;
  value: number;
};

interface SelectInputProps {
  options: SelectInputOption[];
  title: string;
  label: string;
  onChange: (value: SelectInputOption | undefined) => void;
}

export function SelectInput({ options, title, label, onChange }: SelectInputProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<SelectInputOption | undefined>(undefined);

  function selectOption(option: SelectInputOption) {
    if (value !== option) {
      setValue(option);
    } else {
      setValue(undefined);
    }
  }

  function isOptionSelected(option: SelectInputOption) {
    return option === value;
  }

  return (
    <div className={cx('select')}>
      <p className={cx('select__label')}>{label}</p>
      <button
        tabIndex={0}
        type="button"
        className={cx('select__input', {
          'select__input--opened': isOpen,
        })}
        onClick={() => setIsOpen((prev) => !prev)}>
        <p className={cx('select__value')}>{typeof value === 'undefined' ? title : value.label}</p>
        <ChevronIcon className={cx({ 'select__icon--rotated': isOpen })} />
      </button>
      {isOpen && (
        <div className={cx('select__list')}>
          {options.map((option) => (
            <button
              type="button"
              className={cx('select__list-item', {
                'select__list-item--selected': isOptionSelected(option),
              })}
              key={option.value}
              value={option.value}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                onChange(value);
              }}>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
