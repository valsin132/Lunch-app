import { ReactElement, ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Card.module.css';

const cx = classNames.bind(styles);

type Spacing = 'none' | '3xs' | '2xs' | 'xs' | 's';
type BoxShadow = 'none' | 'xs' | 's' | 'm';
type RoundedCorners = 'all' | 'left' | 'right';

type CardProps = {
  children: ReactNode;
  spacing?: Spacing;
  shadow?: BoxShadow;
  roundedCorners?: RoundedCorners;
  isNoBorder?: boolean;
  isFullWidth?: boolean;
};

export function Card({
  children,
  spacing = '2xs',
  shadow = 'none',
  roundedCorners = 'all',
  isNoBorder = false,
  isFullWidth = false,
}: CardProps): ReactElement {
  return (
    <div
      className={cx(
        'card',
        { 'card--no-border': isNoBorder },
        { 'card--full-width': isFullWidth },
        [`card--spacing-${spacing}`],
        [`card--rounded-corners-${roundedCorners}`],
        [`card--box-shadow-${shadow}`]
      )}>
      {children}
    </div>
  );
}
