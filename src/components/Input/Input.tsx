import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import { SearchIcon } from '../../utils/iconManager';
import styles from './Input.module.css';

const cx = classNames.bind(styles);

type TextFieldType = 'text' | 'email' | 'password';

interface InputProps {
  textFieldType: TextFieldType;
  withIcon?: boolean;
  label: string;
  value: string;
  name: string;
  isError?: boolean;
  placeholder?: string;
  id: string;
  errorMessage?: string;
  isDisabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  textFieldType,
  placeholder,
  id,
  label,
  isDisabled,
  onChange,
  isError,
  withIcon,
  value,
  name,
  errorMessage,
}: InputProps): ReactElement {
  return (
    <div className={cx('input')}>
      <label
        htmlFor={id}
        className={cx('input__label', {
          'input__label--disabled': isDisabled,
          'input__label--error': isError,
        })}>
        {label}
      </label>
      <span className={cx('input__field-container')}>
        <input
          placeholder={placeholder}
          type={textFieldType}
          id={id}
          name={name}
          className={cx('input__field', {
            'input__field--error': isError,
            'input__field--with-icon': withIcon,
          })}
          disabled={isDisabled}
          onChange={onChange}
          value={value}
        />
        {withIcon && (
          <i className={cx('input__field-icon')}>
            <SearchIcon className={cx('icon')} />
          </i>
        )}
        <p className={cx('input__error-message')}>{errorMessage}</p>
      </span>
    </div>
  );
}
