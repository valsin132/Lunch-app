import { ReactElement, ReactNode } from 'react'
import styles from './Card.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Spacing = '3xs' | '2xs' | 'xs' | 's';
type BoxShadow = 'none' | 'xs' | 's' | 'm';
type RoundedCorners = "all" | "left" | "right"

type CardProps = {
    children: ReactNode;
    spacing?: Spacing;
    shadow?: BoxShadow;
    roundedCorners?: RoundedCorners;
};

export const Card = ({ children, spacing = '2xs', shadow = 'none', roundedCorners = 'all', }: CardProps): ReactElement => {
    return (
        <div className={cx(
            'card',
            {
                [`card--spacing-${spacing}`]: spacing,
                [`card--rounded-corners-${roundedCorners}`]: roundedCorners,
                [`card--box-shadow-${shadow}`]: shadow !== 'none',
            }
        )}
        >
            {children}
        </div>
    )
}