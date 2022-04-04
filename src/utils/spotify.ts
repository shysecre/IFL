import SpotifyWebApi from "spotify-web-api-node";

export const SpotifyWeb = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});