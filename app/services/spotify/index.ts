import { SpotifyApi } from '@/app/api/spotify'
import { PlaylistReducerItem, PlaylistReducerItemTrack } from '@/app/types'
import { TrackObject } from '@/app/types/spotify/shared'
import { getPlaylistPic, getTrackPic } from '@/app/utils'

export class SpotifyService {
  static async fetchAndConstructFavoritePlaylist(bind: string | null = null): Promise<PlaylistReducerItem> {
    const fetchedTracks = await SpotifyApi.getFavoriteTracksAll()

    return {
      id: 'SAVED_TRACKS',
      bind,
      image: '/assets/images/favorite-playlist.png',
      isFavoritePlaylist: true,
      name: 'Saved Tracks',
      tracks: fetchedTracks.map<PlaylistReducerItemTrack>(({ track }) => ({
        id: track.id,
        artist: track.artists.map((a) => a.name).join(', '),
        image: getTrackPic(track),
        title: track.name,
      })),
    }
  }

  static async addTrack(playlist: PlaylistReducerItem) {
    let success = false
    let track: TrackObject | null = null

    try {
      const { currently_playing_type, item } = await SpotifyApi.getCurrentTrack()

      if (!item || currently_playing_type !== 'track') {
        throw new Error('Track is not found')
      }

      let isAlreadyAdded: boolean

      if (playlist.isFavoritePlaylist) {
        isAlreadyAdded = await SpotifyApi.isTrackAlreadySaved(item.id)
      } else {
        isAlreadyAdded = playlist.tracks.some((t) => t.id === item.id)
      }

      if (isAlreadyAdded) {
        throw new Error('Track already added')
      }

      if (playlist.isFavoritePlaylist) {
        await SpotifyApi.addTracksToFavorite([item.id])
      } else {
        await SpotifyApi.addTracksToPlaylist(playlist.id, [item.id])
      }

      track = item
      success = true
    } catch (err) {
      console.error(err)
    }

    return { success, track }
  }

  static async fetchAndConstructPlaylist(id: string, bind: string | null = null): Promise<PlaylistReducerItem> {
    const playlist = await SpotifyApi.getPlaylistById(id)

    if (!playlist) {
      throw new Error(`Playlist with id ${id} was not found`)
    }

    const tracks = await SpotifyApi.getPlaylistTracksAll(playlist.id, { filterLocal: true })

    return {
      id,
      bind,
      isFavoritePlaylist: false,
      image: getPlaylistPic(playlist),
      name: playlist.name,
      tracks: tracks
        .sort((a, b) => new Date(b.added_at).getTime() - new Date(a.added_at).getTime())
        .map(({ track }) => ({
          id: track.id,
          artist: track.artists.map((a) => a.name).join(', '),
          image: getTrackPic(track),
          title: track.name,
        })),
    }
  }
}
