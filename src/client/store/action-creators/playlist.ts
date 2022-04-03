import { useActions } from "client/hooks/useActions";
import { Dispatch } from "redux";
import { GetState } from "client/store";
import { PlaylistAction, PlaylistActions } from "shared/types/playlist";
import { SpotifyWeb } from "utils/spotify";

interface res {
  items: any[];
  next?: string;
}

const fetchAllTracks = async (
  res: res,
  dispatch: Dispatch<PlaylistAction>,
  playlistId: string
) => {
  if (!res.next) return;

  dispatch({
    type: PlaylistActions.FETCH_TRACKS,
  });

  const offset = +new URL(res.next).searchParams.get("offset");

  const { body } = await window.api.spotify.getPlaylistTracks(playlistId, {
    offset,
  });

  dispatch({
    type: PlaylistActions.FETCH_TRACKS_SUCCESS,
    payload: body.items.map(item => {
      const { track } = item;

      return {
        name: track.name,
        img: track.album.images[0].url,
        artists: track.artists.map(artist => `${artist.name}`).join(", "),
      };
    }),
  });

  fetchAllTracks(body, dispatch, playlistId);
};

export const fetchTracks = () => {
  return async (dispatch: Dispatch<PlaylistAction>, getState: GetState) => {
    try {
      dispatch({ type: PlaylistActions.FETCH_TRACKS });

      const state = getState();

      const { body } = await window.api.spotify.getPlaylistTracks(
        state.playlist.playlistId
      );

      dispatch({
        type: PlaylistActions.FETCH_TRACKS_SUCCESS,
        payload: body.items.map(item => {
          const { track } = item;

          return {
            name: track.name,
            img: track.album.images[0].url,
            artists: track.artists.map(artist => `${artist.name}`).join(", "),
          };
        }),
      });

      fetchAllTracks(body, dispatch, state.playlist.playlistId);
    } catch (err) {
      dispatch({
        type: PlaylistActions.FETCH_TRACKS_ERROR,
        payload: err.message,
      });
    }
  };
};

export const editPlaylistId = (playlistId: string) => {
  return async (dispatch: Dispatch<PlaylistAction>, getState: GetState) => {
    clearPlaylistTracks()(dispatch);

    dispatch({
      type: PlaylistActions.EDIT_PLAYLIST_ID,
      payload: playlistId,
    });

    fetchTracks()(dispatch, getState);
  };
};

export const clearPlaylistTracks = () => {
  return async (dispatch: Dispatch<PlaylistAction>) => {
    dispatch({
      type: PlaylistActions.CLEAR_TRACKS,
    });
  };
};

export const addTrack = () => {
  return async (dispatch: Dispatch<PlaylistAction>, getState: GetState) => {
    try {
      dispatch({ type: PlaylistActions.ADD_TRACK });

      dispatch({
        type: PlaylistActions.ADD_TRACK_SUCCESS,
        payload: {
          artists: "hooi",
          img: "poshel",
          name: "nahooi",
        },
      });
    } catch (err) {
      dispatch({
        type: PlaylistActions.ADD_TRACK_ERROR,
        payload: err.message,
      });
    }
  };
};
