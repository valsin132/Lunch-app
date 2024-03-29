import { ReactElement, ReactNode } from 'react'
import styles from "./Card.module.css";

type Spacing = "xs" | "s" | "m"

type BoxShadow = "xs" | "s" | "m"

type CardProps = {
    children: ReactNode;
    spacing?: Spacing;
    shadow?: BoxShadow;
};

const getSpacing = (spacing?: Spacing): string => {
    return spacing ? styles[`card--spacing_${spacing}`] : ""
}

const getBoxShadow = (boxShadow?: BoxShadow): string => {
    return boxShadow ? styles[`card--boxShadow_${boxShadow}`] : ""
}

export const Card = ({ children, spacing, shadow }: CardProps): ReactElement => {
    return (
        <div className={`${styles.card} ${getSpacing(spacing)} ${getBoxShadow(shadow)}`}>
            {children}
        </div>
    )
}