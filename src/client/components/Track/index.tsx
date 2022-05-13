import classNames from 'classnames'
import React from 'react'
import { Text } from '../Text'
import { TrackProps } from './index.props'
import styles from './index.module.css'

export const Track: React.FC<TrackProps> = ({ track, idx }): JSX.Element => {
  const onImageClick = (url: string) => {
    window.api.utils.openInBrowser(url)
  }

  return (
    <div className={classNames(styles.trackBox)}>
      <img
        src={track.img}
        onClick={() => onImageClick(track.img)}
        title="Click on me to get image ;)"
        className={classNames(styles.img)}
      />
      <div>
        <Text type="h2" className={classNames(styles.textArtist)}>
          {track.artists}
        </Text>
        <Text type="h4" className={classNames(styles.textName)}>
          {track.name}
        </Text>
      </div>
    </div>
  )
}
