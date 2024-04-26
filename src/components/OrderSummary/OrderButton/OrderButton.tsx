import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { CheckFilledCircleIcon } from '../../../utils/iconManager';
import styles from './OrderButton.module.css';

const cx = classNames.bind(styles);

type OrderButtonProps = {
  onSubmit: () => void;
  disabled?: boolean;
};
const timeToHoldInSeconds = 1;
export function OrderButton({ onSubmit, disabled }: OrderButtonProps) {
  const [isBought, setIsBougth] = useState(false);
  const [isHeld, setIsHeld] = useState(false);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const backgroundElementRef = useRef<HTMLDivElement>(null);
  const buttonElementRef = useRef<HTMLButtonElement>(null);
  // const holdTime = useRef(0);
  const handlePointerDown = () => {
    if (disabled || isBought) return;
    setIsHeld(true);
    let modifier = 1;
    if (backgroundElementRef.current && buttonElementRef.current) {
      modifier =
        1 - backgroundElementRef.current.offsetWidth / buttonElementRef.current.offsetWidth;
    }
    holdTimeoutRef.current = setTimeout(
      () => {
        setIsBougth(true);
        onSubmit();
      },
      timeToHoldInSeconds * 1000 * modifier
    );
  };
  const handlePointerUp = () => {
    if (disabled || isBought) return;
    setIsHeld(false);
    if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
  };
  return (
    <button
      className={cx('buy-button', {
        'buy-button--held': isHeld,
        'buy-button--bought': isBought && !disabled,
      })}
      disabled={disabled}
      type="button"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      ref={buttonElementRef}>
      <div className={cx('buy-button__background')} ref={backgroundElementRef} />
      {!isBought || disabled ? (
        <span>Press & Hold to Send</span>
      ) : (
        <>
          <span>Confirmed</span> <CheckFilledCircleIcon />
        </>
      )}
    </button>
  );
}
