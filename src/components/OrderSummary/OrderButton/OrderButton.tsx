import classNames from 'classnames/bind';
import styles from './OrderButton.module.css';

const cx = classNames.bind(styles);

type OrderButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export function OrderButton({ onClick, disabled }: OrderButtonProps) {
  return (
    <button
      className={cx('order-summary__buy-button')}
      disabled={disabled}
      onClick={onClick}
      type="button">
      Press & Hold to Send
    </button>
  );
}
