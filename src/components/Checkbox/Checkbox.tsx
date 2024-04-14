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
    <div className={cx('checkbox-container')}>
      <input
        type="checkbox"
        id={id}
        className={cx('checkbox-container__input', {
          'checkbox-container__input--error': isError,
        })}
        disabled={isDisabled}
        onChange={onChange}
      />
      <label
        className={cx('checkbox-container__label', {
          'checkbox-container__label--error': isError,
          'checkbox-container__label--disabled': isDisabled,
        })}
        htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
