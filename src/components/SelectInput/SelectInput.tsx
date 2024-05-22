import { ReactElement, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { ChevronIcon } from '../../utils/iconManager';
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
  isBoxShadowDisabled?: boolean;
  isSelectListTop?: boolean;
  isSelectListItemCentered?: boolean;
  isSelectListItemPadding?: boolean;
  onChange: (option: SelectInputOption | undefined) => void;
}

export function SelectInput({
  options,
  placeholder,
  value,
  label,
  isSelectListTop,
  isBoxShadowDisabled,
  isSelectListItemCentered,
  isSelectListItemPadding,
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
          'select__input--none-box-shadow': isBoxShadowDisabled,
        })}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}>
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
        <div className={cx('select__list', { 'select__list--top': isSelectListTop })}>
          {options.map((option) => (
            <button
              type="button"
              className={cx('select__list-item', {
                'select__list-item--selected': isSelected(option),
                'select__list-item--text-centered': isSelectListItemCentered,
                'select__list-item--padding-centered': isSelectListItemPadding,
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
