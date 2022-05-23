import classNames from 'classnames'
import { useActions } from 'client/hooks/useActions'
import { useTypedSelector } from 'client/hooks/useTypedSelector'
import React, { ChangeEvent, useEffect, useState } from 'react'
import MainPageProps from './index.props'
import styles from './index.module.css'
import { Button } from 'client/components/Button'
import { Text } from 'client/components/Text'
import { Playlist } from 'shared/types/user'
import { PlaylistComponent } from 'client/components/Playlist'
import { Modal } from 'client/components/Modal'

const MainPage: React.FC<MainPageProps> = ({}: MainPageProps) => {
  const { playlists, selectedPlaylists, isAddingNewPlaylist } =
    useTypedSelector(state => state.user)
  const { setSelectedPlaylist, fetchPlaylists, setBind, setAddingNewPlaylist } =
    useActions()

  const [filteredPlaylists, setFilteredPlaylists] = useState([])
  const [displayModal, setDisplayModal] = useState(false)
  const onPlaylistSelect = (id: string, name: string) => {
    if (
      id === 'Select playlist' ||
      selectedPlaylists.find(({ playlistId }) => playlistId === id)
    )
      return

    onEditPlaylistId({
      id,
      name,
    })

    if (isAddingNewPlaylist) setAddingNewPlaylist()
  }

  const onRefreshPlaylist = () => fetchPlaylists()
  const onEditPlaylistId = (playlist: Playlist) => {
    setSelectedPlaylist(playlist)
  }
  const onModalOpen = () => {
    fetchPlaylists()

    setDisplayModal(true)
  }

  useEffect(() => {
    const playlistLine = localStorage.getItem('playlists')

    if (playlistLine && playlistLine.replace(/ /g, '').length) {
      const macthed = playlistLine.match(/(?<=\")(.*?)(?=\")/g)

      for (const _playlist of macthed) {
        const [id, name, bind] = _playlist.split(':')

        if (!id || !name) continue

        setSelectedPlaylist({
          id,
          name,
        })

        if (bind) setBind(id, bind)
      }
    }
  }, [])

  useEffect(() => {
    setDisplayModal(true)
  }, [isAddingNewPlaylist])

  useEffect(() => {
    const filteredPlaylists = playlists.reduce((acc, curr) => {
      if (selectedPlaylists.find(el => el.playlistName === curr.name))
        return acc

      acc.push(curr)

      return acc
    }, [])

    if (filteredPlaylists.length) setFilteredPlaylists(filteredPlaylists)
  }, [selectedPlaylists.length, playlists.length])

  return (
    <div className={classNames(styles.mainPage)}>
      {selectedPlaylists.length && !isAddingNewPlaylist ? (
        <div className={styles.main}>
          {selectedPlaylists.map((playlist, idx) => {
            return <PlaylistComponent playlist={playlist} key={idx} />
          })}
        </div>
      ) : (
        <div className={classNames(styles.noPlaylists)}>
          {displayModal || isAddingNewPlaylist ? (
            <Modal
              setDisplayModal={setDisplayModal}
              displayModal={displayModal}
              displayRefreshButton={true}
              isAddingNewPlaylist={isAddingNewPlaylist}
              refreshPlaylists={onRefreshPlaylist}
            >
              <Text type="h1" className={classNames(styles.text)}>
                Your playlists
              </Text>
              {filteredPlaylists.length ? (
                <div className={classNames(styles.playlists)}>
                  {filteredPlaylists.map((playlist, idx) => {
                    return (
                      <div
                        key={idx}
                        className={classNames(styles.playlistCard)}
                      >
                        <Button
                          className={classNames(styles.playlistSelectButton)}
                          onClick={() =>
                            onPlaylistSelect(playlist.id, playlist.name)
                          }
                        >
                          {playlist.name}
                        </Button>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <Text type="h1" className={classNames(styles.text)}>
                  Please create at least one playlist
                </Text>
              )}
            </Modal>
          ) : (
            <>
              <Button onClick={onModalOpen}>
                Select at least one playlist
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default MainPage
