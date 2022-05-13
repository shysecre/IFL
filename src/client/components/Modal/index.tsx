import React from 'react'
import classNames from 'classnames'
import { ModalProps } from './index.props'
import styles from './index.module.css'
import { Button } from '../Button'
import { useActions } from 'client/hooks/useActions'

export const Modal = ({
  displayModal,
  setDisplayModal,
  className,
  children,
  isAddingNewPlaylist,
  refreshPlaylists,
  displayRefreshButton,
  ...props
}: ModalProps) => {
  const { setAddingNewPlaylist } = useActions()
  const onClose = () => {
    if (isAddingNewPlaylist) setAddingNewPlaylist()
    setDisplayModal(false)
  }

  return (
    <div
      className={classNames(className, styles.modal, {
        [styles.displayModal]: displayModal,
      })}
      {...props}
    >
      <div className={classNames(styles.modalContent)}>
        {children}
        <div className={classNames(styles.buttons)}>
          <Button onClick={onClose}>
            Close
          </Button>
          {displayRefreshButton && (
            <Button onClick={refreshPlaylists}>Refresh</Button>
          )}
        </div>
      </div>
    </div>
  )
}
