import styles from "./Tab.module.css";
import { useState } from "react";

interface TabProps {
  label: string;
  href: string;
}

export const Tab: React.FC<TabProps> = ({ label, href }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <div className={isActive ? styles.containerActive : styles.container}>
      <a href={href} className={styles.tab} onClick={handleClick}>
        {label}
      </a>
    </div>
  );
};
