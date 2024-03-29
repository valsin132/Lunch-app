import React, { Children, ReactElement } from "react";
import styles from './Button.module.css';

type ButtonSize = 'md' | 'sm' | 'xs'

type ButtonColor = 'white' | 'blue' | 'orange'

type IconPosition = 'left' | 'right';

type ButtonTextColor = 'white' | 'purple' | 'orange' | 'blue'


type ButtonWidth = 'auto' | 'full';
interface ButtonProps {
    title: string;
    buttonSize: ButtonSize;
    buttonColor: ButtonColor;
    icon?: string;
    iconPosition: IconPosition;
    buttonTextColor: ButtonTextColor;
    buttonWidth: ButtonWidth;
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

export const Button = ({ buttonSize, buttonColor, title, icon, iconPosition, buttonTextColor, buttonWidth, disabled, onClick }: ButtonProps): ReactElement => {

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
          `} onClick={onClick} disabled={disabled}>
            {displayIconLeft && (
                <img src={icon} className={`${styles.button__icon} ${styles.button__icon__left}`} />
            )}
            {title}
            {displayIconRight && (
                <img src={icon} className={`${styles.button__icon} ${styles.button__icon__right}`} />
            )}
        </button>
    );
};
