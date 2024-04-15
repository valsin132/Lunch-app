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
    <div className={cx('select-container')}>
      <p className={cx('select-container__label')}>{label}</p>
      <div
        tabIndex={0}
        role="button"
        onKeyDown={() => setIsOpen((prev) => !prev)}
        className={cx('select-container__title', {
          'select-container__title--selected': isOpen,
        })}
        onClick={() => setIsOpen((prev) => !prev)}>
        <p className={cx('select-container__title-text')}>
          {typeof value === 'undefined' ? title : value.name}
        </p>
        <ChevronIcon className={cx({ 'select-container__icon--rotated': isOpen })} />
      </div>
      {isOpen && (
        <div className={cx('select-container__list')}>
          {options.map((option) => (
            <button
              type="button"
              className={cx('select-container__list-item', {
                'select-container__list-item--selected': isOptionSelected(option),
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
