export interface ImageObject {
  url: string
}

export interface PaginatedResponse {
  limit: number
  offset: number
  next: string | null
}

export interface TrackObject {
  artists: { name: string }[]
  id: string
  name: string
  is_local: boolean
  album: { images: ImageObject[] }
}
