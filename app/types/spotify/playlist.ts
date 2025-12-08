import { ImageObject, PaginatedResponse } from '@/app/types/spotify/shared'

export interface GetPlaylistsObject {
  id: string
  images: ImageObject[]
  name: string
  uri: string
  tracks: { href: string; total: number }
  owner: { id: string }
}

export interface GetPlaylistTrackObject {
  album: { images: ImageObject[] }
  artists: { name: string }[]
  id: string
  name: string
  type: string
}

export interface GetPlaylistTracksObject {
  is_local: boolean
  added_at: string
  track: GetPlaylistTrackObject
}

export interface GetPlaylistsPaginatedResponse extends PaginatedResponse {
  items: GetPlaylistsObject[]
}

export interface GetPlaylistTracksPaginatedResponse extends PaginatedResponse {
  items: GetPlaylistTracksObject[]
}
