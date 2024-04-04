import { ReactElement, useState } from "react";
import styles from "./Toast.module.css"
import classNames from "classnames/bind"
import { CheckOutlinedIcon, CloseIcon, ErrorOutlinedIcon, InfoOutlinedIcon } from "../../utils/iconManager";

const cx = classNames.bind(styles)

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
    <div className={cx("toast", [getColorBg(colorBg)])}>
        <div className={cx("toast__icon-info")}>{getIcon(icon)}</div>
        <p className={cx("toast__text")}>{content}</p>
        <div><CloseIcon className={cx("toast__icon-close")} onClick={handleClose} /></div>
    </div>
  ) : <></>
}


