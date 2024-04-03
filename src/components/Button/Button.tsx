import React, { ReactElement } from "react";
import styles from './Button.module.css';
import { AddIcon, ArrowForwardFilled } from '../../utils/iconManager';

type ButtonSize = 'md' | 'sm' | 'xs'

type ButtonType = 'primary' | 'secondary' | 'tertiary'

type IconType = 'arrow' | 'plus'

type ButtonWidth = 'auto' | 'full';


interface ButtonProps {
    title: string;
    buttonSize: ButtonSize;
    buttonType: ButtonType;
    iconType?: IconType;
    buttonWidth: ButtonWidth;
    onClick: () => void;
    disabled?: boolean;
}

const getButtonSize = (buttonSize?: ButtonSize): string => {
    return buttonSize ? styles[`button--size-${buttonSize}`] : ''
}

const getButtonType = (buttonType?: ButtonType): string => {
    return buttonType ? styles[`button--color-${buttonType}`] : ''
}

const getButtonWidth = (buttonWidth?: ButtonWidth): string => {
    return buttonWidth ? styles[`button__width-${buttonWidth}`] : ''
}

export const Button = ({
    buttonSize = "md",
    buttonType = "primary",
    title,
    buttonWidth = "auto",
    disabled,
    iconType,
    onClick
}: ButtonProps): ReactElement => {

    return (
        <button
            className={`
        ${styles.button} 
        ${getButtonSize(buttonSize)} 
        ${getButtonWidth(buttonWidth)}
        ${getButtonType(buttonType)}
          `}
            onClick={onClick}
            disabled={disabled}
            aria-disabled={disabled}
        >
            {iconType === "plus" && <AddIcon className={styles.button__icon} />}
            {title}
            {iconType === "arrow" && <ArrowForwardFilled className={styles.button__icon} />}
        </button>
    );
};
