export interface PlaylistReducerItem {
  id: string
  name: string
  image: string
  isFavoritePlaylist: boolean
  bind: string | null
  tracks: PlaylistReducerItemTrack[]
}

export interface PlaylistReducerItemTrack {
  id: string
  title: string
  artist: string
  image: string
}

export interface PlaylistReducerActionMap {
  ADD_PLAYLIST: PlaylistReducerItem
  REMOVE_PLAYLIST: Pick<PlaylistReducerItem, 'id'>
  UPDATE_BIND: Pick<PlaylistReducerItem, 'id' | 'bind'>
  ADD_TRACK: Pick<PlaylistReducerItem, 'id'> & { track: PlaylistReducerItemTrack }
  REMOVE_ALL_PLAYLISTS: { withSavedPlaylist?: boolean }
}

export type PlaylistReducerAction = {
  [K in keyof PlaylistReducerActionMap]: { type: K; item: PlaylistReducerActionMap[K] }
}[keyof PlaylistReducerActionMap]
