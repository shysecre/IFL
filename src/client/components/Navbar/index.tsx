import React from "react";
import styles from "./index.module.css";
import classNames from "classnames";
import { useTypedSelector } from "client/hooks/useTypedSelector";
import { useActions } from "client/hooks/useActions";

export const Navbar = ({}): JSX.Element => {
  const { accessToken } = useTypedSelector(state => state.currentUser);
  const { logoutUser } = useActions();
  const onHide = () => {
    window.api.send("Rhide-window", "");
  };
  const onHideToTray = () => {
    window.api.send("Rhide-window-to-tray", "");
  };
  const onLogout = () => {
    logoutUser();
  };

  return (
    <>
      <div className={classNames(styles.nav, styles.navCentered, styles.drag)}>
        <svg
          onClick={onHide}
          className={classNames(styles.dash, styles.noDrag)}
          viewBox="0 0 24 24"
        >
          <path
            fill="url(#Gradient)"
            d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"
          />
        </svg>
        <svg
          onClick={onHideToTray}
          className={classNames(styles.mark, styles.noDrag)}
          viewBox="0 0 24 24"
        >
          <path
            fill="url(#Gradient)"
            d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z"
          />
          <defs>
            <linearGradient id="Gradient" x2="1" y2="1">
              <stop offset="33%" stopColor="#924949" />
              <stop offset="66%" stopColor="#e03c3c" />
              <stop offset="99%" stopColor="#ff0909" />
            </linearGradient>
          </defs>
        </svg>
        {accessToken ? (
          <svg
            onClick={onLogout}
            className={classNames(styles.logout, styles.noDrag)}
            viewBox="0 0 512 512"
          >
            <path
              fill="url(#Gradient)"
              d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z"
            />
            <defs>
              <linearGradient id="Gradient" x2="1" y2="1">
                <stop offset="33%" stopColor="#924949" />
                <stop offset="66%" stopColor="#e03c3c" />
                <stop offset="99%" stopColor="#ff0909" />
              </linearGradient>
            </defs>
          </svg>
        ) : null}
      </div>
    </>
  );
};
