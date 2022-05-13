import SpotifyWebApi, { GetPlaylistTracksOptions } from 'spotify-web-api-node'
import { SpotifyWeb } from 'utils/spotify'

const instance = new SpotifyWebApi()

type AuthCodeGrant = ReturnType<typeof instance.authorizationCodeGrant>
type SetAccessToken = ReturnType<typeof instance.setAccessToken>
type SetRefreshToken = ReturnType<typeof instance.setRefreshToken>
type GetPlaylistTracks = ReturnType<typeof instance.getPlaylistTracks>
type RefreshAccessToken = ReturnType<typeof instance.refreshAccessToken>
type GetPlayingTrack = ReturnType<typeof instance.getMyCurrentPlayingTrack>
type AddTrackToPlaylist = ReturnType<typeof instance.addTracksToPlaylist>
type GetUserPlaylists = ReturnType<typeof instance.getUserPlaylists>

declare global {
  interface Window {
    api: {
      send: (channel: string, data: any) => void
      receive: (
        channel: string,
        callback: (event: any, ...args: any) => void
      ) => void
      remove: (channel: string) => void
      dirname: string
      utils: {
        openInBrowser(url: string): void
      }
      server: {
        createServer(): void
        stopServer(): void
      }
      spotify: {
        getUserPlaylists(): GetUserPlaylists
        createAuthUrl(scopes: string[], state: string): string
        authCodeGrant(code: string): AuthCodeGrant

        setAccessToken(accessToken: string): SetAccessToken
        setRefreshToken(refreshToken: string): SetRefreshToken
        refreshToken(): RefreshAccessToken

        getPlayingTrack(): GetPlayingTrack
        getPlaylistTracks(
          playlistId: string,
          options?: GetPlaylistTracksOptions
        ): GetPlaylistTracks

        addTrackToPlaylist(
          playlistId: string,
          tracks: string | string[]
        ): AddTrackToPlaylist
      }
    }
  }
}
export {}
