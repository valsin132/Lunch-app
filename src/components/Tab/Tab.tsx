import styles from "./Tab.module.css";
import { useState, MouseEvent } from "react";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
interface TabProps {
  label: string;
  onClick?: (e: MouseEvent) => void;
}
export const Tab: React.FC<TabProps> = ({ label, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e: MouseEvent) => {
    setIsActive(!isActive);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div className={cx(`tab--container`)}>
      <button
        className={cx([`tab`], { ["tab--active"]: isActive })}
        onClick={handleClick}
      >
        {label}
      </button>
    </div>
  );
};
