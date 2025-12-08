import { TrackObject } from '@/app/types/spotify/shared'

export interface NowPlaying {
  item: TrackObject | null
  currently_playing_type: 'track' | 'episode' | 'unknown'
}
