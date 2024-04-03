import React, { ReactElement } from "react";
import styles from './Button.module.css';
import { AddIcon, ArrowForwardFilled } from '../../utils/iconManager';

type ButtonSize = 'md' | 'sm' | 'xs'

type ButtonType = 'primary' | 'secondary' | 'tertiary'

type IconType = 'arrow' | 'plus'

type ButtonWidth = 'auto' | 'full';

type ButtonIconColor = 'yellow' | 'default';

interface ButtonProps {
    title: string;
    buttonSize: ButtonSize;
    buttonType: ButtonType;
    iconType?: IconType;
    buttonWidth?: ButtonWidth;
    buttonIconColor?: ButtonIconColor;
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

const getButtonIconColor = (buttonIconColor?: ButtonIconColor): string => {
    return buttonIconColor ? styles[`button__icon-${buttonIconColor}`] : ''
}


export const Button = ({
    buttonSize = "md",
    buttonType = "primary",
    title,
    buttonWidth = "auto",
    disabled,
    iconType,
    buttonIconColor = "default",
    onClick
}: ButtonProps): ReactElement => {

    const displayIconPlus = iconType === "plus"
    const displayIconArrow = iconType === "arrow"

    return (
        <button
            className={`
        ${styles.button} 
        ${getButtonSize(buttonSize)} 
        ${getButtonWidth(buttonWidth)}
        ${getButtonType(buttonType)}
        ${getButtonIconColor(buttonIconColor)}
          `} onClick={onClick} disabled={disabled}>
            {displayIconPlus && (
                <div className={`${styles.button__icon}  ${styles['button__icon-' + iconType]}`}>
                    <AddIcon />
                </div>
            )}
            {title}
            <div>
            </div>
            {displayIconArrow && (
                <div className={`${styles.button__icon}  ${styles['button__icon-' + iconType]}`}>
                    <ArrowForwardFilled />
                </div>
            )}
        </button>
    );
};
