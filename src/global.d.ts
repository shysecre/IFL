import SpotifyWebApi, { GetPlaylistTracksOptions } from "spotify-web-api-node";
import { SpotifyWeb } from "utils/spotify";

const instance = new SpotifyWebApi();

declare global {
  interface Window {
    api: {
      send: (channel: string, data: any) => void;
      receive: (
        channel: string,
        callback: (event: any, ...args: any) => void
      ) => void;
      dirname: string;
      spotify: {
        openInBrowser(url: string): void;
        createServer(): void;
        stopServer(): void;
        createAuthUrl(scopes: string[], state: string): string;
        authCodeGrant(
          code: string
        ): ReturnType<typeof instance.authorizationCodeGrant>;
        setAccessToken(
          accessToken: string
        ): ReturnType<typeof instance.setAccessToken>;
        setRefreshToken(
          refreshToken: string
        ): ReturnType<typeof instance.refreshAccessToken>;
        getPlaylistTracks(
          playlistId: string,
          options?: GetPlaylistTracksOptions
        ): ReturnType<typeof instance.getPlaylistTracks>;
        refreshToken(): ReturnType<typeof instance.refreshAccessToken>;
      };
    };
  }
}
export {};
