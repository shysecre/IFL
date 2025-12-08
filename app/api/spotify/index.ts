import { getConfig } from '@/lib/utils'
import { createAxiosManager } from '..'
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '@/app/utils'
import { InternalAxiosRequestConfig, AxiosError } from 'axios'
import {
  GetPlaylistsPaginatedResponse,
  SavedTracksResponse,
  GetPlaylistsObject,
  TokenResponsePayload,
  Tokens,
  UserMeResponse,
  GetPlaylistTracksPaginatedResponse,
  NowPlaying,
} from '@/app/types'
import { OptionsWithOffsetAndFilterLocal } from '@/app/api/spotify/types'

export class SpotifyApi {
  private static cfg = getConfig()
  private static isRefreshing = false

  private static api = createAxiosManager(
    { baseURL: this.cfg.SPOTIFY_API_URL },
    {
      requestInterceptor: this.extendConfigWithToken.bind(this),
      responseInterceptor: this.handleUnauthorizedResponse.bind(this),
    }
  )

  private static tokenApi = createAxiosManager({
    baseURL: this.cfg.SPOTIFY_TOKEN_URL,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })

  static getUserData() {
    return this.api.get<UserMeResponse>('/me').then((r) => r.data)
  }

  static addTracksToPlaylist(playlistId: string, tracksIds: string[]) {
    return this.api.post(`/playlists/${playlistId}/tracks`, { uris: tracksIds.map((id) => `spotify:track:${id}`) })
  }

  static addTracksToFavorite(trackIds: string[]) {
    return this.api.put('/me/tracks', { ids: trackIds })
  }

  static isTrackAlreadySaved(trackId: string) {
    return this.api.get<boolean[]>('/me/tracks/contains', { params: { ids: trackId } }).then((r) => r.data[0])
  }

  static getCurrentTrack() {
    return this.api.get<NowPlaying>('/me/player/currently-playing', {  }).then((r) => r.data)
  }

  /**
   *
   * @param filterLocal `false` by default
   * @param offset `0` by default
   * @returns
   */
  static getUserPlaylists(userId: string, { offset = 0, filterLocal = false }: OptionsWithOffsetAndFilterLocal) {
    return this.api
      .get<GetPlaylistsPaginatedResponse>(`/users/${userId}/playlists`, { params: { limit: 50, offset } })
      .then((r) => {
        if (filterLocal) {
          r.data.items = r.data.items.filter((r) => r.owner.id === userId)
        }

        return r.data
      })
  }

  /**
   *
   * @param filterLocal `false` by default
   * @param offset `0` by default
   * @returns
   */
  static async getUserPlaylistsAll(
    userId: string,
    { offset = 0, filterLocal = false }: OptionsWithOffsetAndFilterLocal
  ) {
    let res = await this.getUserPlaylists(userId, { offset, filterLocal })

    const playlists = res.items

    while (res.next) {
      res = await this.getUserPlaylists(userId, { offset: res.offset + res.limit, filterLocal })

      playlists.push(...res.items)
    }

    return playlists
  }

  static getPlaylistById(id: string) {
    return this.api.get<GetPlaylistsObject>(`/playlists/${id}`).then((r) => r.data)
  }

  /**
   * @param id id of the playlist
   * @param options `{ offset: 0, filterLocal: false }` default
   * @returns
   */
  static getPlaylistTracks(id: string, options?: OptionsWithOffsetAndFilterLocal) {
    if (!options) {
      options = { offset: 0, filterLocal: false }
    }

    return this.api
      .get<GetPlaylistTracksPaginatedResponse>(`/playlists/${id}/tracks`, {
        params: { offset: options.offset, limit: 50 },
      })
      .then((r) => {
        if (options.filterLocal) {
          r.data.items = r.data.items.filter((r) => !r.is_local)
        }

        return r.data
      })
  }

  /**
   * @param id id of the playlist
   * @param options `{ offset: 0, filterLocal: false }` default
   * @returns
   */
  static async getPlaylistTracksAll(id: string, options?: OptionsWithOffsetAndFilterLocal) {
    if (!options) {
      options = { offset: 0, filterLocal: false }
    }

    let res = await this.getPlaylistTracks(id, options)

    const tracks = res.items

    while (res.next) {
      res = await this.getPlaylistTracks(id, { offset: res.offset + res.limit, filterLocal: options.filterLocal })

      tracks.push(...res.items)
    }

    return tracks
  }

  /**
   *
   * @param filterLocal `true` by default
   * @param offset `0` by default
   * @returns
   */
  static getFavoriteTracks({ filterLocal = true, offset = 0 }: OptionsWithOffsetAndFilterLocal) {
    return this.api.get<SavedTracksResponse>('/me/tracks', { params: { limit: 50, offset } }).then((r) => {
      if (filterLocal) {
        r.data.items = r.data.items.filter((t) => !t.track.is_local)
      }

      return r.data
    })
  }

  /**
   *
   * @param filterLocal `true` by default
   * @param offset `0` by default
   * @returns
   */
  static async getFavoriteTracksAll(options?: OptionsWithOffsetAndFilterLocal) {
    if (!options) {
      options = { filterLocal: true, offset: 0 }
    }

    let res = await this.getFavoriteTracks(options)

    const tracks = res.items

    while (res.next) {
      res = await this.getFavoriteTracks({ ...options, offset: res.offset + res.limit })

      tracks.push(...res.items)
    }

    return tracks
  }

  static extendConfigWithToken(config: InternalAxiosRequestConfig) {
    const token = getAccessToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }

  static refreshTokens(refreshToken: string) {
    if (!refreshToken) {
      throw new Error('Refresh token not found!')
    }

    const data = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: this.cfg.CLIENT_ID,
    }

    return this.tokenApi.post<TokenResponsePayload>('/token', data).then((r) => r.data)
  }

  static exchangeCode(code: string, verifier: string) {
    const body = {
      client_id: this.cfg.CLIENT_ID,
      grant_type: 'authorization_code',
      redirect_uri: this.cfg.REDIRECT_URL,
      code_verifier: verifier,
      code,
    }

    return this.tokenApi.post<TokenResponsePayload>('/token', body).then((r) => r.data)
  }

  static async handleUnauthorizedResponse(error: AxiosError) {
    const originalRequest: any = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (this.isRefreshing) {
        return Promise.reject(error)
      }

      originalRequest._retry = true
      this.isRefreshing = true

      try {
        const refreshToken = getRefreshToken()

        if (!refreshToken) {
          return Promise.reject(error)
        }

        const { access_token, refresh_token } = await this.refreshTokens(refreshToken)

        setAccessToken(access_token)
        setRefreshToken(refresh_token)

        originalRequest.headers['Authorization'] = 'Bearer ' + access_token
        return this.api(originalRequest)
      } catch (err) {
        localStorage.removeItem(Tokens.ACCESS_TOKEN)
        localStorage.removeItem(Tokens.REFRESH_TOKEN)

        return Promise.reject(err)
      } finally {
        this.isRefreshing = false
      }
    }

    return Promise.reject(error)
  }

  static getOAuthUrl(codeChallenge: string) {
    const params = {
      response_type: 'code',
      client_id: this.cfg.CLIENT_ID,
      redirect_uri: this.cfg.REDIRECT_URL,
      scope: this.cfg.scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    }

    const url = new URL(this.cfg.SPOTIFY_AUTH_URL)

    url.search = new URLSearchParams(params).toString()

    return url.toString()
  }
}
