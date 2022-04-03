import {
  PlaylistAction,
  PlaylistActions,
  PlaylistState,
} from "shared/types/playlist";

const initialState: PlaylistState = {
  playlistId: "",
  tracks: [],
  isCaching: false,
  isAddingTrack: false,
  isCacheDone: false,
};

export const playlistReducer = (
  state = initialState,
  action: PlaylistAction
): PlaylistState => {
  switch (action.type) {
    case PlaylistActions.FETCH_TRACKS:
      return { ...state, isCaching: true };

    case PlaylistActions.FETCH_TRACKS_ADDING:
      return { ...state, tracks: state.tracks.concat(action.payload) };

    case PlaylistActions.FETCH_TRACKS_SUCCESS:
      return { ...state, isCaching: false, isCacheDone: true };

    case PlaylistActions.FETCH_TRACKS_ERROR:
      return { ...state, isCaching: false, error: action.payload };

    case PlaylistActions.ADD_TRACK:
      return { ...state, isAddingTrack: true };

    case PlaylistActions.ADD_TRACK_SUCCESS:
      state.tracks.push(action.payload);
      return { ...state, isAddingTrack: false };

    case PlaylistActions.ADD_TRACK_ERROR:
      return { ...state, isAddingTrack: false, error: action.payload };

    case PlaylistActions.EDIT_PLAYLIST_ID:
      return { ...state, playlistId: action.payload };

    case PlaylistActions.CLEAR_TRACKS:
      return { ...state, tracks: [] };

    default:
      return state;
  }
};
