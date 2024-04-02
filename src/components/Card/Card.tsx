import { ReactElement, ReactNode } from 'react'
import styles from './Card.module.css';

type Spacing = '3xs' | '2xs' | 'xs' | 's';
type BoxShadow = 'none' | 'xs' | 's' | 'm';

type CardProps = {
    children: ReactNode;
    spacing?: Spacing;
    shadow?: BoxShadow;
};

const getBoxShadow = (boxShadow?: BoxShadow): string => {
    return boxShadow !== `none` ? styles[`card--boxShadow-${boxShadow}`] : ''
}

export const Card = ({ children, spacing = '2xs', shadow = 'none' }: CardProps): ReactElement => {
    return (
        <div className={`${styles.card} ${styles['card-spacing-' + spacing]} ${getBoxShadow(shadow)}`}>
            {children}
        </div>
    )
}