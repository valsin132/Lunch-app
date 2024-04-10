import { ReactElement, useState } from 'react';
import classNames from 'classnames/bind';
import { ChevronIcon } from '../../utils/iconManager';
import styles from './Dropdown.module.css';

const cx = classNames.bind(styles);

type DropdownOption = {
  name: string;
  id: string;
};

interface DropdownProps {
  isSelected?: boolean;
  options: DropdownOption[];
  title: string;
  label: string;
  onClickHandler: () => void;
}

export function Dropdown({
  options,
  title,
  label,
  isSelected,
  onClickHandler,
}: DropdownProps): ReactElement {
  const [isOpen, setisOpen] = useState(false);

  return (
    <div className={cx('dropdown-container')}>
      <p className={cx('dropdown-container__label')}>{label}</p>
      <div
        tabIndex={0}
        role="button"
        onKeyDown={onClickHandler}
        className={cx('dropdown-container__title')}
        onClick={() => setisOpen((prev) => !prev)}>
        <p className={cx('dropdown-container__title--text')}>{title}</p>
        <ChevronIcon className={cx('dropdown-container__icon')} />
      </div>
      <div className={cx({ 'list--hidden': !isOpen, 'dropdown-container__list': isOpen })}>
        {options.map((option) => (
          <button
            type="button"
            className={cx('dropdown-container__list-item', {
              'dropdown-container__list-item--selected': isSelected,
            })}
            key={option.id}
            value={option.name}
            onClick={onClickHandler}>
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
}
