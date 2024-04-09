import { ReactElement, ChangeEvent } from 'react';
import classNames from 'classnames/bind';
import { SearchIcon } from '../../utils/iconManager';
import styles from './Input.module.css';

const cx = classNames.bind(styles);

type TextFieldType = 'text' | 'email' | 'number' | 'password';

type IconType = 'search';

interface InputProps {
  textFieldType: TextFieldType;
  iconType?: IconType;
  label: string;
  value: number | string;
  name: string;
  isError?: boolean;
  placeholder?: string;
  id: string;
  isDisabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  textFieldType,
  placeholder,
  id,
  label,
  isDisabled,
  onChange,
  isError,
  iconType,
  value,
  name,
}: InputProps): ReactElement {
  return (
    <div className={cx('input')}>
      <label htmlFor={id} className={cx('input__label')}>
        {label}
      </label>
      <span className={cx('input__field-container')}>
        <input
          placeholder={placeholder}
          type={textFieldType}
          id={id}
          name={name}
          className={cx('input__field', {
            'input__field--text-error': isError,
            'input__field--text-search': iconType === 'search',
          })}
          disabled={isDisabled}
          onChange={onChange}
          value={value}
        />
        {iconType === 'search' && (
          <i className={cx('input__field--search-icon')}>
            <SearchIcon className={cx('icon')} />
          </i>
        )}
      </span>
    </div>
  );
}
