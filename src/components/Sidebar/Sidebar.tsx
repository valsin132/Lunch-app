import classNames from 'classnames/bind';
import { useState } from 'react';
import { ChevronIcon } from '../../utils/iconManager';
import { Navigation } from './Navigation';
import styles from './Sidebar.module.css';

const cx = classNames.bind(styles);

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside
      id="sidebar-nav"
      className={cx('sidebar', {
        'sidebar--collapsed': !isExpanded,
      })}>
      <div
        className={cx('sidebar__container', {
          'sidebar__container--collapsed': !isExpanded,
        })}>
        <div className={cx('sidebar__logo-wrapper')}>
          <div
            className={cx('sidebar__logo', {
              'sidebar__logo--collapsed': !isExpanded,
            })}
          />
        </div>
        <Navigation isExpanded={isExpanded} />
      </div>
      <button
        className={cx('sidebar__expand-btn')}
        type="button"
        aria-label="Sidebar expand button"
        aria-controls="sidebar-nav"
        aria-expanded={isExpanded}
        onClick={handleExpand}>
        <ChevronIcon className={cx('sidebar__expand-icon')} />
      </button>
    </aside>
  );
}
