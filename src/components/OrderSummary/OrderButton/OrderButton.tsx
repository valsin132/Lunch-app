import classNames from 'classnames/bind';
import styles from './OrderButton.module.css';

const cx = classNames.bind(styles);

type OrderButtonProps = {
  onSubmit: () => void;
  disabled?: boolean;
};

export function OrderButton({ onSubmit, disabled }: OrderButtonProps) {
  return (
    <button
      className={cx('order-summary__buy-button')}
      disabled={disabled}
      type="button"
      onClick={onSubmit}>
      Press & Hold to Send
    </button>
  );
}
