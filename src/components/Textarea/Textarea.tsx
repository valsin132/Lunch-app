import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import styles from './Textarea.module.css';

const cx = classNames.bind(styles);

interface TextAreaProps {
  label: string;
  value: string;
  id: string;
  name: string;
  placeholder?: string;
  onChange: () => void;
}

export function TextArea({
  placeholder,
  label,
  id,
  value,
  onChange,
  name,
}: TextAreaProps): ReactElement {
  return (
    <div className={cx('textarea')}>
      <label htmlFor={id} className={cx('textarea__label')}>
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        className={cx('textarea__textfield')}
        onChange={onChange}
      />
    </div>
  );
}
