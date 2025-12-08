import { usePlaylistsDispatch, useSettings, useSettingsDispatch } from '@/app/hooks'
import { SpotifyService } from '@/app/services'
import { ChangeEvent, useState } from 'react'

export const FavoritePlaylistSettingCategory = () => {
  const [isLoading, setIsLoading] = useState(false)

  const settings = useSettings()
  const settingsDispatch = useSettingsDispatch()
  const playlistDispatch = usePlaylistsDispatch()

  const onCheck = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true)
    const isChecked = event.target.checked

    settingsDispatch({ type: 'UPDATE_SETTINGS', item: { ...settings, enableFavoritePlaylist: isChecked } })

    if (!isChecked) {
      playlistDispatch({ type: 'REMOVE_PLAYLIST', item: { id: 'SAVED_TRACKS' } })
    } else {
      const playlist = await SpotifyService.fetchAndConstructFavoritePlaylist()
      playlistDispatch({ type: 'ADD_PLAYLIST', item: playlist })
    }
    setIsLoading(false)
  }

  return (
    <div className="flex gap-2">
      <span className="text-2xl">Enable favorite playlist: </span>
      <input
        disabled={isLoading}
        checked={settings.enableFavoritePlaylist}
        onChange={onCheck}
        type="checkbox"
        className="w-5"
      />
    </div>
  )
}
