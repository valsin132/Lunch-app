import { ReactElement, useState } from 'react';
import classNames from 'classnames/bind';
import { ChevronIcon } from '../../utils/iconManager';
import styles from './SelectInput.module.css';

const cx = classNames.bind(styles);

export type SelectInputOption = {
  label: string;
  value: number;
};

interface SelectInputProps {
  options: SelectInputOption[];
  value?: SelectInputOption;
  placeholder?: string;
  label: string;
  onChange: (option: SelectInputOption | undefined) => void;
}

export function SelectInput({
  options,
  placeholder,
  value,
  label,
  onChange,
}: SelectInputProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const isSelected = (option: SelectInputOption): boolean => value?.value === option.value;

  return (
    <div className={cx('select')}>
      <p className={cx('select__label')}>{label}</p>
      <button
        tabIndex={0}
        type="button"
        className={cx('select__input', {
          'select__input--focused': isOpen,
        })}
        onClick={() => setIsOpen((prev) => !prev)}>
        <div>
          {value ? (
            <p className={cx('select__value')}>{value.label}</p>
          ) : (
            <p className={cx('select__placeholder')}>{placeholder}</p>
          )}
        </div>
        <ChevronIcon className={cx({ 'select__icon--rotated': isOpen })} />
      </button>
      {isOpen && (
        <div className={cx('select__list')}>
          {options.map((option) => (
            <button
              type="button"
              className={cx('select__list-item', {
                'select__list-item--selected': isSelected(option),
              })}
              key={option.value}
              value={option.label}
              onClick={() => {
                if (isSelected(option)) {
                  onChange(undefined);
                } else {
                  onChange(option);
                  setIsOpen((prev) => !prev);
                }
              }}>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
