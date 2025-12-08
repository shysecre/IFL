import { PaginatedResponse, TrackObject } from '@/app/types/spotify/shared'

export interface SavedTrackObject {
  added_at: string // ISO 8601 date-time
  track: TrackObject
}

export interface SavedTracksResponse extends PaginatedResponse {
  items: SavedTrackObject[]
}
