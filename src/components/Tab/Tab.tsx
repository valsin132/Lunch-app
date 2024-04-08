import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import styles from './Tab.module.css';

const cx = classNames.bind(styles);
interface TabProps {
  label: string;
  activeTab: string;
  onClick: (label: string) => void;
}

export function Tab({ label, activeTab, onClick }: TabProps): ReactElement {
  const isActive = activeTab === label;
  const handleClick = () => {
    if (onClick) {
      onClick(label);
    }
  };
  return (
    <div className={cx(`tab-container`)}>
      <button
        type="button"
        className={cx([`tab`], { 'tab--active': isActive })}
        onClick={handleClick}>
        {label}
      </button>
    </div>
  );
}
