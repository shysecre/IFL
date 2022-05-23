import React, { useEffect } from 'react'
import styles from './index.module.css'
import classNames from 'classnames'
import { useTypedSelector } from 'client/hooks/useTypedSelector'
import { useActions } from 'client/hooks/useActions'

export const Navbar = ({}): JSX.Element => {
  const {
    user: { accessToken },
    app: { isUpdateLive },
  } = useTypedSelector(state => state)
  const {
    setUpdateLive,
    setUpdateOffline,
    logoutUser,
    setAddingNewPlaylist,
    fetchPlaylists,
  } = useActions()
  const { selectedPlaylists } = useTypedSelector(state => state.user)

  useEffect(() => {
    window.api.receive('update-available', () => {
      setUpdateLive()
    })
  }, [])

  const onHide = () => {
    window.api.send('hide-window', '')
  }
  const onHideToTray = () => {
    window.api.send('hide-window-to-tray', '')
  }
  const onUpdate = () => {
    window.api.send('need-to-update', '')
    setUpdateOffline()
  }
  const onLogout = () => {
    logoutUser()
  }
  const onPlaylistAdd = () => {
    setAddingNewPlaylist()
    fetchPlaylists()
  }

  return (
    <div className={classNames(styles.main)}>
      <div className={classNames(styles.nav, styles.drag)}>
        {selectedPlaylists.length ? (
          <svg
            onClick={onPlaylistAdd}
            className={classNames(styles.selectPlaylist, styles.noDrag)}
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 472.615 472.615"
          >
            <path
              fill="url(#Gradient)"
              d="M404.671,62.369c-33.84-11.598-32.844-46.209-32.787-47.674l-0.035-0.003V0.971h-19.614v325.06
			c-24.423-24.829-68.413-35.239-113.135-23.455c-34.52,9.021-63.058,29.224-78.258,55.31
			c-10.592,18.142-13.632,37.267-8.827,55.408c9.513,35.797,48.251,58.35,93.754,58.35c11.965,0,24.322-1.569,36.874-4.803
			c34.521-9.122,63.059-29.325,78.26-55.41c7.308-12.635,10.912-25.743,10.857-38.67h0.089V64.423
			c6.627,6.783,15.236,12.659,26.464,16.506C438.238,94.606,456,128.355,452.6,184.094l19.575,1.187
			C476.13,120.425,453.418,79.071,404.671,62.369z"
            />
            <rect
              fill="url(#Gradient)"
              y="0.975"
              width="302.799"
              height="19.614"
            />

            <rect
              fill="url(#Gradient)"
              y="78.05"
              width="302.799"
              height="19.614"
            />
            <rect
              fill="url(#Gradient)"
              y="155.136"
              width="302.799"
              height="19.614"
            />

            <rect
              fill="url(#Gradient)"
              y="232.222"
              width="302.799"
              height="19.614"
            />
          </svg>
        ) : null}
        <svg
          onClick={onHide}
          className={classNames(styles.mark, styles.noDrag)}
          viewBox="0 0 24 24"
        >
          <path
            fill="url(#Gradient)"
            d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z"
          />
          <defs>
            <linearGradient id="Gradient" x2="1" y2="1">
              <stop offset="10%" stopColor="#90ffa2" />
              <stop offset="85%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          onClick={onHideToTray}
          className={classNames(styles.dash, styles.noDrag)}
          viewBox="0 0 24 24"
        >
          <path
            fill="url(#Gradient)"
            d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"
          />
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
          </svg>
        ) : null}
        {isUpdateLive ? (
          <svg
            onClick={onUpdate}
            className={classNames(styles.update, styles.noDrag)}
            viewBox="0 0 384 512"
          >
            <path
              fill="#00ff08"
              d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
            />
          </svg>
        ) : null}
      </div>
    </div>
  )
}
