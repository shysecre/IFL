export interface userState {
  accessToken: string | null
  refreshToken: string | null
  expiresIn: number | null
  isAddingNewPlaylist: boolean
  playlists: Playlist[]
  selectedPlaylists?: SelectedPlaylist[]
  error?: string
}

export interface Track {
  artists: string
  img: string
  name: string
}

export interface Playlist {
  name: string
  id: string
}

export interface SelectedPlaylist {
  playlistId: string
  playlistName: string
  isCaching: boolean
  tracks: Track[]
  bind: string
  error?: string
}

export interface LoginUserSuccessResponse {
  refreshToken: string
  accessToken: string
  expiresIn: number
}

export interface FetchPlaylistsAction {
  type: userActions.FETCH_PLAYLISTS
  payload: Playlist[]
}

export interface LoginUserSuccessAction {
  type: userActions.LOGIN_USER_SUCCESS
  payload: LoginUserSuccessResponse
}

export interface LoginUserErrorAction {
  type: userActions.LOGIN_USER_ERROR
  payload: string
}

export interface ClearErrorAction {
  type: userActions.CLEAR_ERROR
}

export interface LogoutUserAction {
  type: userActions.LOGOUT_USER
}

export interface SetSelectedPlaylistAction {
  type: userActions.SET_SELECTED_PLAYLIST
  payload: SelectedPlaylist
}

export interface PLAYLIST_ADD_TRACK_SUCCESS {
  type: userActions.PLAYLIST_ADD_TRACK_SUCCESS
  payload: {
    id: string
    track: Track
  }
}

export interface PLAYLIST_ADD_TRACK_ERROR {
  type: userActions.PLAYLIST_ADD_TRACK_ERROR
  payload: {
    id: string
    error: string
  }
}

export interface PLAYLIST_CLEAR_ERROR {
  type: userActions.PLAYLIST_CLEAR_ERROR
  payload: {
    id: string
  }
}

export interface PLAYLIST_FETCH_TRACKS {
  type: userActions.PLAYLIST_FETCH_TRACKS
  payload: {
    id: string
  }
}
export interface PLAYLIST_FETCH_TRACKS_SUCCESS {
  type: userActions.PLAYLIST_FETCH_TRACKS_SUCCESS
  payload: {
    id: string
    tracks: Track[]
  }
}
export interface PLAYLIST_FETCH_TRACKS_ERROR {
  type: userActions.PLAYLIST_FETCH_TRACKS_ERROR
  payload: {
    id: string
    error: string
  }
}
export interface PLAYLIST_SET_BIND {
  type: userActions.PLAYLIST_SET_BIND
  payload: {
    id: string
    bind: string
  }
}

export interface PLAYLIST_REMOVE {
  type: userActions.PLAYLIST_REMOVE
  payload: {
    id: string
  }
}
export interface PLAYLIST_CLEAR_TRACKS {
  type: userActions.PLAYLIST_CLEAR_TRACKS
  payload: {
    id: string
  }
}

export interface PLAYLISTS_CLEAR_SELECTED {
  type: userActions.PLAYLISTS_CLEAR_SELECTED
}

export interface SET_IS_ADDING_NEW_PLAYLIST {
  type: userActions.SET_IS_ADDING_NEW_PLAYLIST
}

type _playlistActions =
  | PLAYLIST_ADD_TRACK_ERROR
  | PLAYLIST_ADD_TRACK_SUCCESS
  | PLAYLIST_FETCH_TRACKS
  | PLAYLIST_FETCH_TRACKS_ERROR
  | PLAYLIST_FETCH_TRACKS_SUCCESS
  | PLAYLIST_SET_BIND
  | PLAYLIST_CLEAR_TRACKS
  | PLAYLIST_REMOVE
  | PLAYLIST_CLEAR_ERROR

type _userActions =
  | LoginUserErrorAction
  | LoginUserSuccessAction
  | LogoutUserAction

export type userAction =
  | _userActions
  | _playlistActions
  | ClearErrorAction
  | SetSelectedPlaylistAction
  | FetchPlaylistsAction
  | SET_IS_ADDING_NEW_PLAYLIST
  | PLAYLISTS_CLEAR_SELECTED

export enum userActions {
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = 'LOGIN_USER_ERROR',
  LOGOUT_USER = 'LOGOUT_USER',
  CLEAR_ERROR = 'CLEAR_ERROR',
  FETCH_PLAYLISTS = 'FETCH_PLAYLISTS',
  SET_SELECTED_PLAYLIST = 'SET_SELECTED_PLAYLIST',
  PLAYLIST_ADD_TRACK_SUCCESS = 'PLAYLIST_ADD_TRACK_SUCESS',
  PLAYLIST_ADD_TRACK_ERROR = 'PLAYLIST_ADD_TRACK_ERROR',
  PLAYLIST_FETCH_TRACKS = 'FETCH_TRACKS',
  PLAYLIST_FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS',
  PLAYLIST_FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
  PLAYLIST_SET_BIND = 'PLAYLIST_SET_BIND',
  PLAYLIST_REMOVE = 'PLAYLIST_REMOVE',
  PLAYLIST_CLEAR_TRACKS = 'PLAYLIST_CLEAR_TRACKS',
  PLAYLIST_CLEAR_ERROR = 'PLAYLIST_CLEAR_ERROR',
  SET_IS_ADDING_NEW_PLAYLIST = 'SET_IS_ADDING_NEW_PLAYLIST',
  PLAYLISTS_CLEAR_SELECTED = 'PLAYLISTS_CLEAR_SELECTED',
}
