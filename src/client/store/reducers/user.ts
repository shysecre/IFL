import { userAction, userActions, userState } from 'shared/types/user'

const initialState: userState = {
  expiresIn: new Date(+localStorage.getItem('expiresIn')).getTime(),
  refreshToken: localStorage.getItem('refreshToken'),
  accessToken: localStorage.getItem('accessToken'),
  playlists: [],
  selectedPlaylists: [],
  isAddingNewPlaylist: false,
  error: null,
}

export const userReducer = (
  state = initialState,
  action: userAction
): userState => {
  switch (action.type) {
    case userActions.LOGIN_USER_SUCCESS:
      const { accessToken, expiresIn, refreshToken } = action.payload

      return { ...state, expiresIn, accessToken, refreshToken }
    case userActions.LOGIN_USER_ERROR:
      return { ...state, error: action.payload }
    case userActions.LOGOUT_USER:
      return {
        ...state,
        accessToken: null,
        expiresIn: null,
        refreshToken: null,
      }
    case userActions.FETCH_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
      }
    case userActions.SET_SELECTED_PLAYLIST:
      state.selectedPlaylists.push(action.payload)
      return { ...state }
    case userActions.CLEAR_ERROR:
      return { ...state, error: null }

    case userActions.PLAYLIST_CLEAR_ERROR:
      const { id: clearErrorId } = action.payload

      state.selectedPlaylists.find(
        ({ playlistId }) => playlistId === clearErrorId
      ).error = null

      return { ...state }

    case userActions.PLAYLIST_ADD_TRACK_SUCCESS:
      const { id: addTrackId, track } = action.payload
      state.selectedPlaylists
        .find(({ playlistId }) => playlistId === addTrackId)
        .tracks.push(track)

      return { ...state }

    case userActions.PLAYLIST_ADD_TRACK_ERROR:
      const { id: addTrackErrorId, error: addTrackError } = action.payload

      state.selectedPlaylists.find(
        ({ playlistId }) => playlistId === addTrackErrorId
      ).error = addTrackError

      return { ...state }

    case userActions.PLAYLIST_FETCH_TRACKS:
      const { id: fetchTracksId } = action.payload
      state.selectedPlaylists.find(
        ({ playlistId }) => playlistId === fetchTracksId
      ).isCaching = true

      return { ...state }

    case userActions.PLAYLIST_FETCH_TRACKS_SUCCESS:
      const { id: fetchTracksSuccessId, tracks } = action.payload
      const playlist = state.selectedPlaylists.find(
        ({ playlistId }) => playlistId === fetchTracksSuccessId
      )

      playlist.tracks = tracks
      playlist.isCaching = false

      return { ...state }

    case userActions.PLAYLIST_FETCH_TRACKS_ERROR:
      const { id: fetchTracksErrorId, error: fetchTracksError } = action.payload

      state.selectedPlaylists.find(
        ({ playlistId }) => playlistId === fetchTracksErrorId
      ).error = fetchTracksError

      return { ...state }

    case userActions.PLAYLIST_SET_BIND:
      const { id: setBindId, bind } = action.payload

      state.selectedPlaylists.find(
        ({ playlistId }) => playlistId === setBindId
      ).bind = bind

      return { ...state }

    case userActions.PLAYLIST_CLEAR_TRACKS:
      const { id: clearTracksId } = action.payload

      state.selectedPlaylists.find(
        ({ playlistId }) => playlistId === clearTracksId
      ).tracks = []

      return { ...state }

    case userActions.PLAYLIST_REMOVE:
      const { id: removePlaylistId } = action.payload

      const filteredPlaylists = state.selectedPlaylists.filter(
        ({ playlistId }) => playlistId != removePlaylistId
      )

      return { ...state, selectedPlaylists: filteredPlaylists }

    case userActions.SET_IS_ADDING_NEW_PLAYLIST:
      return { ...state, isAddingNewPlaylist: !state.isAddingNewPlaylist }

    case userActions.PLAYLISTS_CLEAR_SELECTED:
      return { ...state, selectedPlaylists: [] }

    default:
      return { ...state }
  }
}
