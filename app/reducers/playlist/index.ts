import { PlaylistReducerItem, PlaylistReducerAction } from '@/app/types'

export const playlistReducer = (playlists: PlaylistReducerItem[], { item, type }: PlaylistReducerAction) => {
  switch (type) {
    case 'ADD_PLAYLIST': {
      const playlistIdx = playlists.findIndex((p) => p.id === item.id)

      if (playlistIdx >= 0) {
        playlists[playlistIdx] = item
        break
      }

      playlists.push(item)
      break
    }
    case 'REMOVE_PLAYLIST': {
      playlists = playlists.filter((p) => p.id !== item.id)
      break
    }
    case 'UPDATE_BIND': {
      const playlist = playlists.find((p) => p.id === item.id)

      if (!playlist) break

      playlist.bind = item.bind
      break
    }
    case 'ADD_TRACK': {
      const playlist = playlists.find((p) => p.id === item.id)

      if (!playlist) break

      playlist.tracks.unshift(item.track)
      break
    }
    case 'REMOVE_ALL_PLAYLISTS': {
      playlists = item.withSavedPlaylist ? [] : playlists.filter((p) => p.id === 'SAVED_TRACKS')
      break
    }
  }

  return playlists
}
