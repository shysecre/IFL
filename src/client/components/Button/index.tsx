import React from "react";
import { ButtonProps } from "./index.props";
import cn from "classnames";
import styles from "./index.module.css";

export default ({ children, color = "blue", text, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(styles.button, {
        [styles.buttonBlue]: color == "blue",
        [styles.buttonGreen]: color == "green",
        [styles.buttonRed]: color == "red",
      })}
    >
      {text}
    </button>
  );
};
