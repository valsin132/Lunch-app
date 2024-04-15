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
      <div
        tabIndex={0}
        role="button"
        onKeyDown={() => setIsOpen((prev) => !prev)}
        className={cx('select__input', {
          'select__input--opened': isOpen,
        })}
        onClick={() => setIsOpen((prev) => !prev)}>
        <p className={cx('select__value')}>{typeof value === 'undefined' ? title : value.name}</p>
        <ChevronIcon className={cx({ 'select__icon--rotated': isOpen })} />
      </div>
      {isOpen && (
        <div className={cx('select__list')}>
          {options.map((option) => (
            <button
              type="button"
              className={cx('select__list-item', {
                'select__list-item--selected': isOptionSelected(option),
              })}
              key={option.id}
              value={option.name}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                onChange(value);
              }}>
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
