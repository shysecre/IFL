export interface FetchTracksAction {
  type: PlaylistActions.FETCH_TRACKS;
}

export interface FetchTracksSuccessAction {
  type: PlaylistActions.FETCH_TRACKS_SUCCESS;
}

export interface FetchTracksErrorAction {
  type: PlaylistActions.FETCH_TRACKS_ERROR;
  payload: string;
}

export interface FetchTracksAddingAction {
  type: PlaylistActions.FETCH_TRACKS_ADDING;
  payload: Track[];
}

export interface AddTrackAction {
  type: PlaylistActions.ADD_TRACK;
}

export interface AddTrackError {
  type: PlaylistActions.ADD_TRACK_ERROR;
  payload: string;
}

export interface AddTrackSuccess {
  type: PlaylistActions.ADD_TRACK_SUCCESS;
  payload: Track;
}

export interface EditPlaylistIdAction {
  type: PlaylistActions.EDIT_PLAYLIST_ID;
  payload: string;
}

export interface ClearTracksAction {
  type: PlaylistActions.CLEAR_TRACKS;
}

export interface Track {
  artists: string;
  img: string;
  name: string;
}

export interface PlaylistState {
  playlistId: string;
  tracks: Track[];
  isCaching: boolean;
  isAddingTrack: boolean;
  isCacheDone: boolean;
  error?: string;
}

export type FetchActions =
  | FetchTracksAction
  | FetchTracksAddingAction
  | FetchTracksSuccessAction
  | FetchTracksErrorAction;

export type AddActions = AddTrackAction | AddTrackSuccess | AddTrackError;
export type PlaylistAction =
  | FetchActions
  | AddActions
  | EditPlaylistIdAction
  | ClearTracksAction;

export enum PlaylistActions {
  FETCH_TRACKS = "FETCH_TRACKS",
  FETCH_TRACKS_ADDING = "FETCH_TRACKS_ADDING",
  FETCH_TRACKS_SUCCESS = "FETCH_TRACKS_SUCCESS",
  FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR",
  ADD_TRACK = "ADD_TRACK",
  ADD_TRACK_SUCCESS = "ADD_TRACK_SUCESS",
  ADD_TRACK_ERROR = "ADD_TRACK_ERROR",
  EDIT_PLAYLIST_ID = "EDIT_PLAYLIST_ID",
  CLEAR_TRACKS = "CLEAR_TRACKS",
}
