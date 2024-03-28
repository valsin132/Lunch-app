import React, { Children, ReactElement } from "react";
import styles from './Button.module.css';

type ButtonSize = "md" | "sm" | "xs"

type ButtonColor = "white" | "blue" | "orange"

type IconPosition = "left" | "right";

interface ButtonProps {
    title: string;
    buttonSize?: ButtonSize;
    buttonColor: ButtonColor;
    icon?: string;
    iconLocation?: 'left' | 'right'
}

const getButtonSize = (buttonSize?: ButtonSize): string => {
    return buttonSize ? styles[`button__size_${buttonSize}`] : ""
}

const getButtonColor = (buttonColor?: ButtonColor): string => {
    return buttonColor ? styles[`button__color_${buttonColor}`] : ""
}

export const Button = ({ buttonSize, buttonColor, title, icon, iconLocation }: ButtonProps): ReactElement => {

    const displayIconLeft = icon && iconLocation === 'left'
    const displayIconRight = icon && iconLocation === 'right'

    return (
        <button className={`${styles.button} ${getButtonSize(buttonSize)} ${getButtonColor(buttonColor)}`} >
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
