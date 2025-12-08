import * as z from 'zod'

export enum LocalStorageKeys {
  SETTINGS = 'settings',
}

export const selectedPlaylistSchema = z.object({
  bind: z.string().nullable().default(null),
  id: z.string(),
})

export type SelectedPlaylist = z.infer<typeof selectedPlaylistSchema>

export const settingsSchema = z.object({
  selectedPlaylists: z.array(selectedPlaylistSchema).default([]),
  favoritePlaylistBind: z.string().default(''),
  enableFavoritePlaylist: z.boolean().default(true),
})

export type Settings = z.infer<typeof settingsSchema>

export const parseSettings = z
  .string()
  .transform((str) => JSON.parse(str))
  .pipe(settingsSchema)
