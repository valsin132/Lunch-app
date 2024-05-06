import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { CheckFilledCircleIcon } from '../../../utils/iconManager';
import styles from './OrderButton.module.css';

const cx = classNames.bind(styles);

type OrderButtonProps = {
  onSubmit: () => void;
  isDisabled?: boolean;
};

const timeToHoldInSeconds = 1;

export function OrderButton({ onSubmit, isDisabled }: OrderButtonProps) {
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [isConfirmOrderHeld, setIsConfirmOrderHeld] = useState(false);

  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const backgroundElementRef = useRef<HTMLDivElement>(null);
  const buttonElementRef = useRef<HTMLButtonElement>(null);

  // used to set button states to default when order context is empty
  useEffect(() => {
    if (isDisabled) {
      setIsOrderConfirmed(false);
      setIsConfirmOrderHeld(false);
    }
  }, [isDisabled]);

  const handlePointerDown = () => {
    if (isDisabled || isOrderConfirmed) return;
    setIsConfirmOrderHeld(true);
    let currentHoldProgress = 1;
    if (backgroundElementRef.current && buttonElementRef.current) {
      currentHoldProgress =
        1 - backgroundElementRef.current.offsetWidth / buttonElementRef.current.offsetWidth;
    }
    holdTimeoutRef.current = setTimeout(
      () => {
        setIsOrderConfirmed(true);
        onSubmit();
      },
      timeToHoldInSeconds * 1000 * currentHoldProgress
    );
  };

  const handlePointerUp = () => {
    if (isDisabled || isOrderConfirmed) return;
    setIsConfirmOrderHeld(false);
    if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
  };

  return (
    <button
      className={cx('buy-button', {
        'buy-button--held': isConfirmOrderHeld,
        'buy-button--order-confirmed': isOrderConfirmed,
      })}
      disabled={isDisabled}
      type="button"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      ref={buttonElementRef}>
      <div className={cx('buy-button__background')} ref={backgroundElementRef} />
      {!isOrderConfirmed ? (
        <span>Press & Hold to Send</span>
      ) : (
        <>
          <span>Confirmed</span> <CheckFilledCircleIcon />
        </>
      )}
    </button>
  );
}
