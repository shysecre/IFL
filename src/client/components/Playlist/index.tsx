import { PlaylistProps } from './index.props'
import React, { KeyboardEvent, useEffect, useState } from 'react'
import { Track } from '../Track'
import { Text } from '../Text'
import classNames from 'classnames'
import styles from './index.module.css'
import { Input } from '../Input'
import { useActions } from 'client/hooks/useActions'
import { Button } from '../Button'

export const PlaylistComponent: React.FC<PlaylistProps> = ({
  playlist,
  ...props
}): JSX.Element => {
  const { bind, isCaching, tracks, playlistId, playlistName, error } = playlist
  const { setBind, fetchPlaylistTracks, removePlaylist } = useActions()
  const [stateBind, setStateBind] = useState(bind)
  const [toDisplayTracks, setToDisplayTracks] = useState(tracks)

  const onRemovePlaylist = () => {
    removePlaylist(playlistId)
  }

  const onBindChange = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key.toUpperCase()
    const ctrl = event.ctrlKey ? 'Control+' : ''
    const alt = event.altKey ? 'Alt+' : ''
    const shift = event.shiftKey ? 'Shift+' : ''

    if (['CONTROL', 'ALT', 'SHIFT'].includes(key)) return

    const finalBind = `${shift}${alt}${ctrl}${key}`

    setStateBind(finalBind)
    setBind(playlistId, finalBind)
  }

  useEffect(() => {
    if (!tracks.length) {
      fetchPlaylistTracks(playlistId)
    }
  }, [])

  useEffect(() => {
    setToDisplayTracks(tracks.slice(-5).reverse())
  }, [tracks.length])

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.playlistCard)} {...props}>
        {error && (
          <Text type="h5" className={classNames(styles.errorText)}>
            {error}
          </Text>
        )}
        <div className={classNames(styles.playlistCardHeader)}>
          <img
            src={toDisplayTracks[0] ? toDisplayTracks[0].img : null}
            className={classNames({
              [styles.playlistCardHeaderImage]: toDisplayTracks[0],
              [styles.hideImage]: !toDisplayTracks[0],
              [styles.removeBorderRadius]: error,
            })}
          />

          <Text className={classNames(styles.text)} type="h3">
            {playlistName}
          </Text>
          <svg
            className={classNames(styles.removeButton)}
            onClick={onRemovePlaylist}
            viewBox="0 0 512 512"
          >
            <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z" />
          </svg>
          <Input
            placeholder="Bind"
            value={stateBind}
            onChange={() => {}}
            onKeyDownCapture={onBindChange}
            className={classNames(styles.bindInput)}
          />
        </div>
        <div className={classNames(styles.playlistCardBody)}>
          <div>
            {isCaching ? (
              <Text type="h1">CACHING...</Text>
            ) : toDisplayTracks.length ? (
              toDisplayTracks.map((track, idx) => (
                <Track key={idx} track={track} idx={idx} />
              ))
            ) : (
              <Text type="h1">Playlist is empty</Text>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
