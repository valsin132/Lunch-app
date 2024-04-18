import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import styles from './Checkbox.module.css';

const cx = classNames.bind(styles);

interface CheckboxProps {
  label: string;
  isError?: boolean;
  isDisabled?: boolean;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({
  label,
  id,
  isDisabled,
  isError,
  onChange,
}: CheckboxProps): ReactElement {
  return (
    <div className={cx('checkbox')}>
      <input
        type="checkbox"
        id={id}
        className={cx('checkbox__input', {
          'checkbox__input--error': isError,
        })}
        disabled={isDisabled}
        onChange={onChange}
      />
      <label
        className={cx('checkbox__label', {
          'checkbox__label--error': isError,
          'checkbox__label--disabled': isDisabled,
        })}
        htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
