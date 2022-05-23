import { Dispatch } from 'redux'
import { GetState } from 'client/store'
import { Playlist, Track, userAction, userActions } from 'shared/types/user'
import axios from 'axios'
import { refreshToken } from 'client/utils/funcs'

interface options {
  req?: boolean
  code?: string
  accessToken?: string
}

interface secondOptions {
  next?: string
  tracks: Track[]
}

const fetchAllTracks = async (
  options: secondOptions,
  dispatch: Dispatch<userAction>,
  playlistId: string
) => {
  if (!options.next) {
    dispatch({
      type: userActions.PLAYLIST_FETCH_TRACKS_SUCCESS,
      payload: {
        id: playlistId,
        tracks: options.tracks,
      },
    })

    return
  }

  const offset = +new URL(options.next).searchParams.get('offset')
  const { body } = await window.api.spotify.getPlaylistTracks(playlistId, {
    offset,
  })

  for (const item of body.items) {
    const { track } = item

    options.tracks.push({
      name: track.name,
      img: track.is_local
        ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
        : track.album.images[0].url,
      artists: track.artists
        .slice(0, 2)
        .map(artist => `${artist.name}`)
        .join(', '),
    })
  }

  options.next = body.next

  fetchAllTracks(options, dispatch, playlistId)
}

const getCodeRec = async (dispatch: Dispatch<userAction>, code?: string) => {
  if (code) {
    let body: {
      access_token: string
      expires_in: number
      refresh_token: string
    }

    body = (await window.api.spotify.authCodeGrant(code)).body

    window.api.spotify.setAccessToken(body.access_token)
    window.api.spotify.setRefreshToken(body.refresh_token)

    localStorage.setItem('expiresIn', `${Date.now() + body.expires_in * 1000}`)
    localStorage.setItem('refreshToken', body.refresh_token)
    localStorage.setItem('accessToken', body.access_token)

    dispatch({
      type: userActions.LOGIN_USER_SUCCESS,
      payload: {
        accessToken: body.access_token,
        expiresIn: +localStorage.getItem('expiresIn'),
        refreshToken: body.refresh_token,
      },
    })
  }

  setTimeout(async () => {
    const res = await axios.get('http://localhost:8080/getCode')

    getCodeRec(dispatch, res.data.code)
  }, 500)
}

export const setBind = (playlistId: string, bind: string) => {
  return async (dispatch: Dispatch<userAction>, getState: GetState) => {
    const state = getState()
    const playlist = state.user.selectedPlaylists.find(
      ({ playlistId: id }) => id === playlistId
    )

    if (playlist.bind === bind) return

    let playlistLine = localStorage.getItem('playlists')

    playlistLine = playlistLine.replace(
      new RegExp(
        `(?<=\\")(${playlist.playlistId}:${playlist.playlistName}.*?)(?=\\")`
      ),
      `${playlist.playlistId}:${playlist.playlistName}:${bind}`
    )

    localStorage.setItem('playlists', playlistLine)

    window.api.send('set-bind', {
      playlistId,
      bind,
    })

    if (playlist.bind) {
      window.api.send('delete-bind', {
        playlistId,
        bind: playlist.bind,
      })
    }

    dispatch({
      type: userActions.PLAYLIST_SET_BIND,
      payload: {
        id: playlistId,
        bind,
      },
    })
  }
}

export const clearPlaylistTracks = (playlistId: string) => {
  return async (dispatch: Dispatch<userAction>) => {
    dispatch({
      type: userActions.PLAYLIST_CLEAR_TRACKS,
      payload: {
        id: playlistId,
      },
    })
  }
}

export const removePlaylist = (playlistId: string) => {
  return async (dispatch: Dispatch<userAction>, getState: GetState) => {
    const state = getState()
    const playlist = state.user.selectedPlaylists.find(
      ({ playlistId: id }) => id === playlistId
    )

    window.api.remove(`add-track-${playlistId}`)

    let playlistLine = localStorage.getItem('playlists')

    playlistLine = playlistLine.replace(
      new RegExp(
        `"(?<=\\")(${playlist.playlistId}:${playlist.playlistName}.*?)(?=\\")"`
      ),
      ''
    )

    localStorage.setItem('playlists', playlistLine)

    if (playlist.bind) {
      window.api.send('delete-bind', {
        playlistId,
        bind: playlist.bind,
      })
    }

    dispatch({
      type: userActions.PLAYLIST_REMOVE,
      payload: {
        id: playlistId,
      },
    })
  }
}

export const setSelectedPlaylist = (playlist: Playlist) => {
  return async (dispatch: Dispatch<userAction>, getState: GetState) => {
    dispatch({
      type: userActions.SET_SELECTED_PLAYLIST,
      payload: {
        bind: '',
        isCaching: false,
        playlistId: playlist.id,
        playlistName: playlist.name,
        error: null,
        tracks: [],
      },
    })

    dispatch({
      type: userActions.PLAYLIST_FETCH_TRACKS,
      payload: {
        id: playlist.id,
      },
    })

    let playlistLine = localStorage.getItem('playlists')

    if (!playlistLine) {
      localStorage.setItem('playlists', `"${playlist.id}:${playlist.name}"`)
    } else {
      localStorage.setItem(
        'playlists',
        playlistLine.replace(
          new RegExp(`"(?<=\\")(${playlist.id}:${playlist.name}.*?)(?=\\")"`),
          ''
        ) + ` "${playlist.id}:${playlist.name}"`
      )
    }

    window.api.receive(`add-track-${playlist.id}`, async data => {
      const state = getState()

      await refreshToken(state, dispatch)

      try {
        const { body } = await window.api.spotify.getPlayingTrack()

        if (body.item.type != 'track') {
          dispatch({
            type: userActions.PLAYLIST_ADD_TRACK_ERROR,
            payload: {
              id: playlist.id,
              error: 'You must play any track to add something new.',
            },
          })

          setTimeout(() => {
            dispatch({
              type: userActions.PLAYLIST_CLEAR_ERROR,
              payload: { id: playlist.id },
            })
          }, 7500)

          return
        }

        const selectedPlaylist = state.user.selectedPlaylists.find(
          ({ playlistId: id }) => id === playlist.id
        )

        if (
          selectedPlaylist.tracks.find(track => track.name === body.item.name)
        ) {
          dispatch({
            type: userActions.PLAYLIST_ADD_TRACK_ERROR,
            payload: {
              id: playlist.id,
              error: `${body.item.artists
                .map(artist => artist.name)
                .join(', ')} - ${body.item.name} already in playlist`,
            },
          })

          setTimeout(() => {
            dispatch({
              type: userActions.PLAYLIST_CLEAR_ERROR,
              payload: { id: playlist.id },
            })
          }, 7500)

          return
        }

        window.api.send('new-track', {
          title: 'New track added!',
          body: `"${body.item.artists
            .slice(0, 2)
            .map(artist => artist.name)
            .join(', ')} — ${body.item.name}" jumped into your ${
            playlist.name
          } playlist!!`,
        })

        await window.api.spotify.addTrackToPlaylist(playlist.id, [
          body.item.uri,
        ])

        dispatch({
          type: userActions.PLAYLIST_ADD_TRACK_SUCCESS,
          payload: {
            id: playlist.id,
            track: {
              artists: body.item.artists
                .slice(0, 2)
                .map(artist => `${artist.name}`)
                .join(', '),
              img: body.item.is_local
                ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
                : body.item.album.images[0].url,
              name: body.item.name,
            },
          },
        })
      } catch (err) {
        dispatch({
          type: userActions.PLAYLIST_ADD_TRACK_ERROR,
          payload: err.message,
        })

        setTimeout(() => {
          dispatch({
            type: userActions.PLAYLIST_CLEAR_ERROR,
            payload: { id: playlist.id },
          })
        }, 7500)
      }
    })

    fetchPlaylistTracks(playlist.id)
  }
}

export const setAddingNewPlaylist = () => {
  return async (dispatch: Dispatch<userAction>) => {
    dispatch({
      type: userActions.SET_IS_ADDING_NEW_PLAYLIST,
    })
  }
}

export const fetchPlaylistTracks = (playlistId: string) => {
  return async (dispatch: Dispatch<userAction>, getState: GetState) => {
    try {
      const state = getState()

      await refreshToken(state, dispatch)

      const { body } = await window.api.spotify.getPlaylistTracks(playlistId)
      const options: secondOptions = {
        next: body.next,
        tracks: [],
      }

      for (const item of body.items) {
        const { track } = item

        options.tracks.push({
          name: track.name,
          img: track.is_local
            ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
            : track.album.images[0].url,
          artists: track.artists
            .slice(0, 3)
            .map(artist => `${artist.name}`)
            .join(', '),
        })
      }

      fetchAllTracks(options, dispatch, playlistId)
    } catch (err) {
      console.log(err)
      dispatch({
        type: userActions.PLAYLIST_FETCH_TRACKS_ERROR,
        payload: err.message,
      })

      setTimeout(() => {
        dispatch({
          type: userActions.PLAYLIST_CLEAR_ERROR,
          payload: { id: playlistId },
        })
      }, 7500)
    }
  }
}

export const fetchPlaylists = () => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      const request = await window.api.spotify.getUserPlaylists()

      console.log(request)

      const formatedPlaylists: Playlist[] = request.body.items.map(item => {
        return { id: item.id, name: item.name }
      })

      dispatch({
        type: userActions.FETCH_PLAYLISTS,
        payload: formatedPlaylists,
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export const logoutUser = () => {
  return async (dispatch: Dispatch<userAction>) => {
    dispatch({
      type: userActions.LOGOUT_USER,
    })

    const items = ['expiresIn', 'refreshToken', 'accessToken', 'playlists']
    items.map(item => localStorage.removeItem(item))

    dispatch({
      type: userActions.SET_IS_ADDING_NEW_PLAYLIST,
    })
    dispatch({
      type: userActions.PLAYLISTS_CLEAR_SELECTED,
    })
  }
}

export const loginUser = ({ code, accessToken, req }: options) => {
  return async (dispatch: Dispatch<userAction>, getState: GetState) => {
    try {
      if (req) {
        return getCodeRec(dispatch)
      } else {
        let body: {
          access_token: string
          expires_in: number
          refresh_token: string
        }

        if (code) {
          body = (await window.api.spotify.authCodeGrant(code)).body
        } else {
          const state = getState()

          body = {
            access_token: accessToken,
            expires_in: 3600,
            refresh_token: state.user.refreshToken,
          }
        }

        window.api.spotify.setAccessToken(body.access_token)
        window.api.spotify.setRefreshToken(body.refresh_token)

        localStorage.setItem(
          'expiresIn',
          `${Date.now() + body.expires_in * 1000}`
        )
        localStorage.setItem('refreshToken', body.refresh_token)
        localStorage.setItem('accessToken', body.access_token)

        dispatch({
          type: userActions.LOGIN_USER_SUCCESS,
          payload: {
            accessToken: body.access_token,
            expiresIn: +localStorage.getItem('expiresIn'),
            refreshToken: body.refresh_token,
          },
        })
      }
    } catch (err) {
      dispatch({
        type: userActions.LOGIN_USER_ERROR,
        payload: err.message,
      })

      setTimeout(() => {
        dispatch({
          type: userActions.CLEAR_ERROR,
        })
      }, 7500)
    }
  }
}
