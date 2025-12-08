import { createContext, useContext, useEffect, useState, JSX } from 'react'
import {
  getAccessToken,
  getProfilePic,
  getRefreshToken,
  getSettings,
  getTrackPic,
  setAccessToken,
  setRefreshToken,
} from '../utils'
import { SpotifyApi } from '../api/spotify'
import { SelectedPlaylist, Tokens } from '../types'
import { SpotifyService } from '@/app/services/spotify'
import { useConveyor, usePlaylists, usePlaylistsDispatch, useSettingsDispatch } from '@/app/hooks'
import { AppEvents } from '@/lib/ipc/constants'

interface AuthContext {
  user: AuthContextUser | null
  isLoading: boolean
  setUser: (data: AuthContextUser | null) => void
  logout: () => void
}

interface AuthContextUser {
  id: string
  username: string
  avatar: string
}

export const AuthContext = createContext<AuthContext | null>(null)

export const AuthProvider = ({ children }): JSX.Element => {
  const [user, setUser] = useState<AuthContextUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const playlistDispatch = usePlaylistsDispatch()
  const playlists = usePlaylists()
  const settingsDispatch = useSettingsDispatch()
  const { unregisterAll, registerBind, unregisterBind } = useConveyor('app')

  const logout = () => {
    localStorage.removeItem(Tokens.ACCESS_TOKEN)
    localStorage.removeItem(Tokens.REFRESH_TOKEN)

    settingsDispatch({ type: 'UPDATE_SETTINGS', item: getSettings(true) })

    unregisterAll().catch(console.error)

    setUser(null)
  }

  const syncFavorite = async (bind: string | null = null) => {
    const favoritePlaylist = await SpotifyService.fetchAndConstructFavoritePlaylist(bind)

    playlistDispatch({ item: favoritePlaylist, type: 'ADD_PLAYLIST' })

    if (bind) {
      registerBind(bind, 'SAVED_TRACKS').catch(console.error)
    }
  }

  const syncSavedPlaylists = async (playlists: SelectedPlaylist[]) => {
    for (const { id, bind } of playlists) {
      const playlist = await SpotifyService.fetchAndConstructPlaylist(id, bind)

      playlistDispatch({ item: playlist, type: 'ADD_PLAYLIST' })

      if (bind) {
        registerBind(bind, id).catch(console.error)
      }
    }
  }

  const onBindPress = async (_, bind: string, playlistId: string) => {
    const playlist = playlists.find((p) => p.id === playlistId)

    if (!playlist) {
      const sameBind = playlists.find((p) => p.bind === bind)

      if (sameBind) return

      return unregisterBind(bind).catch(console.error)
    }

    const { track } = await SpotifyService.addTrack(playlist)

    if (track) {
      playlistDispatch({
        type: 'ADD_TRACK',
        item: {
          id: playlistId,
          track: {
            id: track.id,
            artist: track.artists.map((a) => a.name).join(', '),
            image: getTrackPic(track),
            title: track.name,
          },
        },
      })
    }
  }

  useEffect(() => {
    async function sync() {
      setIsLoading(true)

      const accessToken = getAccessToken()
      const refreshToken = getRefreshToken()

      if (accessToken && refreshToken) {
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)

        const me = await SpotifyApi.getUserData()

        const { enableFavoritePlaylist, selectedPlaylists, favoritePlaylistBind } = getSettings()

        if (enableFavoritePlaylist) {
          await syncFavorite(favoritePlaylistBind)
        }

        if (selectedPlaylists.length) {
          await syncSavedPlaylists(selectedPlaylists)
        }

        setUser({ id: me.id, username: me.display_name, avatar: getProfilePic(me) })

        window.ipc.on(AppEvents.RECEIVE_BIND_PRESS, onBindPress)
      }

      setIsLoading(false)
    }

    sync().catch(console.error)

    return () => {
      window.ipc.off(AppEvents.RECEIVE_BIND_PRESS, onBindPress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <AuthContext.Provider value={{ user, setUser, logout, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('Component must be within AuthContext provider!')
  }

  return ctx
}
