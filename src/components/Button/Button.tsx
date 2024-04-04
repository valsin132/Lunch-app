import React, { ReactElement } from "react";
import styles from './Button.module.css';
import { AddIcon, ArrowLongIcon } from '../../utils/iconManager';
import classNames from "classnames/bind";

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
    isDisabled?: boolean;
}

const cx = classNames.bind(styles);

export const Button = ({
    buttonSize = "md",
    buttonType = "primary",
    title,
    buttonWidth = "auto",
    isDisabled,
    iconType,
    onClick
}: ButtonProps): ReactElement => {

    return (
        <button
            className={cx(
                'button',
                `button--size-${buttonSize}`,
                `button__width-${buttonWidth}`,
                `button--color-${buttonType}`
            )}
            onClick={onClick}
            disabled={isDisabled}
            aria-disabled={isDisabled}
        >
            {iconType === "plus" && <AddIcon className={cx('button', 'button__icon')} />}
            {title}
            {iconType === "arrow" && <ArrowLongIcon className={cx('button', 'button__icon', `button__icon-${iconType}`)} />}
        </button>
    );
};
