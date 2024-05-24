import { ReactElement, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { ChevronIcon, ArrowFilledIcon } from '../../utils/iconManager';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
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
  label?: string;
  isPaginationSelect: boolean;
  onChange: (option: SelectInputOption | undefined) => void;
}

export function SelectInput({
  options,
  placeholder,
  value,
  label,
  isPaginationSelect,
  onChange,
}: SelectInputProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const selectInputRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter<HTMLDivElement>(selectInputRef, () => {
    if (isOpen) setIsOpen(false);
  });
  const isSelected = (option: SelectInputOption): boolean => value?.value === option.value;

  return (
    <div ref={selectInputRef} className={cx('select')}>
      {label && <p className={cx('select__label')}>{label}</p>}
      <button
        tabIndex={0}
        type="button"
        className={cx('select__input', {
          'select__input--focused': isOpen,
          'select__input--none-box-shadow': isPaginationSelect,
        })}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}>
        <div>
          {value ? (
            <p
              className={cx('select__value', {
                'selecet__value--pagination-text': isPaginationSelect,
              })}>
              {value.label}
            </p>
          ) : (
            <p className={cx('select__placeholder')}>{placeholder}</p>
          )}
        </div>

        {!isPaginationSelect ? (
          <ChevronIcon className={cx('select__icon', { 'select__icon--rotated': isOpen })} />
        ) : (
          <ArrowFilledIcon
            className={cx('select__icon-arrow-filled', { 'select__icon--rotated': isOpen })}
          />
        )}
      </button>
      {isOpen && (
        <div className={cx('select__list', { 'select__list--top': isPaginationSelect })}>
          {options.map((option) => (
            <button
              type="button"
              className={cx('select__list-item', {
                'select__list-item--selected': isSelected(option),
                'select__list-item--text-centered': isPaginationSelect,
                'select__list-item--padding-centered': isPaginationSelect,
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
