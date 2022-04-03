const { contextBridge, ipcRenderer, shell } = require("electron");
const { App } = require("utils/server");
const { SpotifyWeb } = require("utils/spotify");

const server = new App(__dirname);

contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  dirname: __dirname,
  spotify: {
    openInBrowser(url) {
      return shell.openExternal(url);
    },
    createServer() {
      return server.createServer();
    },
    stopServer() {
      return server.stopServer();
    },
    createAuthUrl(scopes, state) {
      return SpotifyWeb.createAuthorizeURL(scopes, state);
    },
    authCodeGrant(code) {
      return SpotifyWeb.authorizationCodeGrant(code);
    },
    setAccessToken(token) {
      return SpotifyWeb.setAccessToken(token);
    },
    getPlaylistTracks(playlistId, options) {
      return SpotifyWeb.getPlaylistTracks(playlistId, options);
    },
    setRefreshToken(refreshToken) {
      return SpotifyWeb.setRefreshToken(refreshToken);
    },
    refreshToken() {
      return SpotifyWeb.refreshAccessToken();
    },
  },
});
