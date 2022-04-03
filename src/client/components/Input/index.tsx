import classNames from "classnames";
import React from "react";
import { InputProps } from "./index.props";
import styles from "./index.module.css";

export const Input = ({ placeholder = "", value ="", onChange}: InputProps): JSX.Element => {
  return (
    <div className={classNames(styles.formGroup)}>
      <span className={classNames(styles.span)}>PlaylistID</span>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classNames(styles.formField)}
      ></input>
    </div>
  );
};
