import React, { Children, ReactElement, ReactNode } from "react";
import styles from './Button.module.css';

type ButtonSize = 'md' | 'sm' | 'xs'

type ButtonColor = 'white' | 'blue' | 'orange'

type IconPosition = 'left' | 'right';

type ButtonTextColor = 'white' | 'purple' | 'orange' | 'blue'

type ButtonWidth = 'auto' | 'full';

type ButtonIconColor = 'yellow' | 'default';

interface ButtonProps {
    title: string;
    buttonSize?: ButtonSize;
    buttonColor?: ButtonColor;
    icon?: React.ReactNode;
    iconPosition?: IconPosition;
    buttonTextColor?: ButtonTextColor;
    buttonWidth?: ButtonWidth;
    buttonIconColor?: ButtonIconColor;
    onClick?: () => void;
    disabled?: boolean;
}

const getButtonSize = (buttonSize?: ButtonSize): string => {
    return buttonSize ? styles[`button__size-${buttonSize}`] : ''
}

const getButtonColor = (buttonColor?: ButtonColor): string => {
    return buttonColor ? styles[`button__color-${buttonColor}`] : ''
}

const getButtonTextColor = (buttonTextColor?: ButtonTextColor): string => {
    return buttonTextColor ? styles[`button__text-${buttonTextColor}`] : ''
}

const getButtonWidth = (buttonWidth?: ButtonWidth): string => {
    return buttonWidth ? styles[`button__width-${buttonWidth}`] : ''
}

const getButtonIconColor = (buttonIconColor?: ButtonIconColor): string => {
    return buttonIconColor ? styles[`button__icon-${buttonIconColor}`] : ''
}


export const Button = ({
    buttonSize = "md",
    buttonColor = "blue",
    title,
    icon,
    iconPosition = "right",
    buttonTextColor = "white",
    buttonWidth = "auto",
    disabled,
    buttonIconColor = "default",
    onClick
}: ButtonProps): ReactElement => {

    const displayIconLeft = icon && iconPosition === 'left'
    const displayIconRight = icon && iconPosition === 'right'

    return (
        <button
            className={`
        ${styles.button} 
        ${getButtonSize(buttonSize)} 
        ${getButtonWidth(buttonWidth)}
        ${getButtonTextColor(buttonTextColor)}
        ${getButtonColor(buttonColor)}
        ${getButtonIconColor(buttonIconColor)}
          `} onClick={onClick} disabled={disabled}>
            {displayIconLeft && (
                <span className={`${styles.button__icon} ${styles.button__icon__left}`}>{icon}</span>
            )}
            {title}
            {displayIconRight && (
                <span className={`${styles.button__icon} ${styles.button__icon__right}`}>{icon}</span>
            )}
        </button>
    );
};
