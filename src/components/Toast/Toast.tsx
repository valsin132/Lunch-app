import { ReactElement, useState } from "react";
import styles from "./Toast.module.css"
import { CheckOutlinedIcon, CloseIcon, ErrorOutlinedIcon, InfoOutlinedIcon } from "../../utils/iconManager";

type Icon = "InfoOutlinedIcon" | "CheckOutlinedIcon" | "ErrorOutlinedIcon"

type ColorBg = "purple" | "green" | "red"

interface ToastProps {
    content: string;
    icon: Icon;
    colorBg: ColorBg;
}

const getIcon = (icon : Icon): ReactElement => {
  switch (icon) {
    case "InfoOutlinedIcon":
      return <InfoOutlinedIcon />
    case "CheckOutlinedIcon":
      return <CheckOutlinedIcon />
    case "ErrorOutlinedIcon":
      return <ErrorOutlinedIcon />
    default:
      return <></>
  } 
}

const getColorBg = (colorBg : ColorBg): string => {
  return colorBg ? styles[`toast--color-${colorBg}`] : ""
}

export const Toast = ({ content, icon, colorBg }: ToastProps): ReactElement => {

  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
  }

  return isVisible ? (
    <div className={`${styles.toast} ${getColorBg(colorBg)}`}>
        <div className={styles["icon--info"]}>{getIcon(icon)}</div>
        <p className={styles.text}>{content}</p>
        <div><CloseIcon className={styles["icon--close"]} onClick={handleClose} /></div>
    </div>
  ) : <></>
}


