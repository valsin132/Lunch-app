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
        'sidebar--expanded': isExpanded,
      })}>
      <div
        className={cx('sidebar__container', {
          'sidebar--collapsed': !isExpanded,
          'sidebar--expanded': isExpanded,
        })}>
        <div className={cx('sidebar__logo-wrapper')}>
          <div
            className={cx('sidebar__logo', {
              'sidebar__logo--collapsed': !isExpanded,
              'sidebar__logo--expanded': isExpanded,
            })}
          />
        </div>
        <nav className={cx('navigation')}>
          <Navigation isExpanded={isExpanded} />
        </nav>
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
