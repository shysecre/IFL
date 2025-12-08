import { GetPlaylistsObject, GetPlaylistTrackObject, Tokens, UserMeResponse } from '@/app/types'
import { TrackObject } from '@/app/types/spotify/shared'

export function getAccessToken() {
  return localStorage.getItem(Tokens.ACCESS_TOKEN)
}

export function getRefreshToken() {
  return localStorage.getItem(Tokens.REFRESH_TOKEN)
}

export function setRefreshToken(token: string) {
  localStorage.setItem(Tokens.REFRESH_TOKEN, token)
  return token
}

export function setAccessToken(token: string) {
  localStorage.setItem(Tokens.ACCESS_TOKEN, token)
  return token
}

export function getProfilePic(user: UserMeResponse) {
  return user.images.length ? user.images[0].url : '/assets/images/default-profile.png'
}

export function getPlaylistPic(playlist: GetPlaylistsObject) {
  return playlist.images && playlist.images.length ? playlist.images[0].url : '/assets/images/default-playlist.png'
}

export function getTrackPic(track: TrackObject | GetPlaylistTrackObject) {
  return track.album.images && track.album.images.length
    ? track.album.images[0].url
    : '/assets/images/default-playlist.png'
}
