import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import styles from './Tab.module.css';

const cx = classNames.bind(styles);

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}
export function Tab({ label, isActive, onClick }: TabProps): ReactElement {
  return (
    <div className={cx(['tab-container'], { 'tab-container--active': isActive })}>
      <button className={cx('tab')} onClick={onClick} type="button">
        {label}
      </button>
    </div>
  );
}
