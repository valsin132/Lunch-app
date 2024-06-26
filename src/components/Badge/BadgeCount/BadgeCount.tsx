import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import styles from './BadgeCount.module.css';

const cx = classNames.bind(styles);

interface BadgeProps {
  count: number;
}

export function BadgeCount({ count }: BadgeProps): ReactElement {
  return <div className={cx('badge')}>{count}</div>;
}
