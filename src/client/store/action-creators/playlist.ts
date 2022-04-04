import { Dispatch } from "redux";
import { GetState } from "client/store";
import { PlaylistAction, PlaylistActions } from "shared/types/playlist";
import { refreshToken } from "client/utils/funcs";

interface res {
  items: any[];
  next?: string;
}

export const clearPlaylistError = () => {
  return async (dispatch: Dispatch<PlaylistAction>) => {
    dispatch({
      type: PlaylistActions.CLEAR_ERROR,
    });
  };
};

const fetchAllTracks = async (
  res: res,
  dispatch: Dispatch<PlaylistAction>,
  playlistId: string
) => {
  if (!res.next) {
    dispatch({ type: PlaylistActions.FETCH_TRACKS_SUCCESS });

    return;
  }

  const offset = +new URL(res.next).searchParams.get("offset");
  const { body } = await window.api.spotify.getPlaylistTracks(playlistId, {
    offset,
  });

  dispatch({
    type: PlaylistActions.FETCH_TRACKS_ADDING,
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
    const state = getState();

    await refreshToken(state);

    try {
      if (state.playlist.isCacheDone) return;
      if (!state.playlist.playlistId) return;

      dispatch({ type: PlaylistActions.FETCH_TRACKS });

      const { body } = await window.api.spotify.getPlaylistTracks(
        state.playlist.playlistId
      );

      dispatch({
        type: PlaylistActions.FETCH_TRACKS_ADDING,
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

      setTimeout(() => {
        dispatch({
          type: PlaylistActions.CLEAR_ERROR,
        });
      }, 15000);
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

    localStorage.setItem("playlistId", playlistId);

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
    const state = getState();

    await refreshToken(state);

    try {
      if (!state.playlist.playlistId) {
        dispatch({
          type: PlaylistActions.ADD_TRACK_ERROR,
          payload: "Specify playlistId first to add new track.",
        });

        setTimeout(() => {
          dispatch({
            type: PlaylistActions.CLEAR_ERROR,
          });
        }, 15000);

        return;
      }

      dispatch({ type: PlaylistActions.ADD_TRACK });

      const { body } = await window.api.spotify.getPlayingTrack();

      if (body.item.type != "track") {
        dispatch({
          type: PlaylistActions.ADD_TRACK_ERROR,
          payload: "You must play any track to add something new.",
        });

        setTimeout(() => {
          dispatch({
            type: PlaylistActions.CLEAR_ERROR,
          });
        }, 15000);

        return;
      }

      if (state.playlist.tracks.find(track => track.name === body.item.name)) {
        dispatch({
          type: PlaylistActions.ADD_TRACK_ERROR,
          payload: `Track "${body.item.artists
            .map(artist => artist.name)
            .join(", ")} - ${body.item.name}" already in playlist.`,
        });

        setTimeout(() => {
          dispatch({
            type: PlaylistActions.CLEAR_ERROR,
          });
        }, 15000);

        return;
      }

      await window.api.spotify.addTrackToPlaylist(state.playlist.playlistId, [
        body.item.uri,
      ]);

      dispatch({
        type: PlaylistActions.ADD_TRACK_SUCCESS,
        payload: {
          artists: body.item.artists.map(artist => `${artist.name}`).join(", "),
          img: body.item.album.images[0].url,
          name: body.item.name,
        },
      });
    } catch (err) {
      dispatch({
        type: PlaylistActions.ADD_TRACK_ERROR,
        payload: err.message,
      });

      setTimeout(() => {
        dispatch({
          type: PlaylistActions.CLEAR_ERROR,
        });
      }, 15000);
    }
  };
};
