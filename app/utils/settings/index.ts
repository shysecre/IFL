import { LocalStorageKeys, parseSettings, Settings } from '@/app/types'

const DEFAULT_SETTINGS: Settings = {
  enableFavoritePlaylist: true,
  favoritePlaylistBind: '',
  selectedPlaylists: [],
}

export function getSettings(def: boolean = false) {
  if (def) {
    return DEFAULT_SETTINGS
  }

  try {
    const _local = localStorage.getItem(LocalStorageKeys.SETTINGS)
    const p = _local ? parseSettings.parse(_local) : DEFAULT_SETTINGS

    return p
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function setSettings(settings: Settings) {
  const str = JSON.stringify(settings)

  localStorage.setItem(LocalStorageKeys.SETTINGS, str)
}
