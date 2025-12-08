/* eslint-disable react-hooks/exhaustive-deps */
import { SpotifyApi } from '@/app/api'
import { MultiSelect } from '@/app/components/ui'
import { useSettings, useSettingsDispatch, usePlaylistsDispatch } from '@/app/hooks'
import { useAuth } from '@/app/providers'
import { SpotifyService } from '@/app/services'
import { GetPlaylistsObject } from '@/app/types'
import { useEffect, useState } from 'react'

export const SelectPlaylistsSettingsCategory = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const settings = useSettings()
  const settingsDispatch = useSettingsDispatch()

  const [playlists, setPlaylists] = useState<GetPlaylistsObject[]>([])
  const playlistDispatch = usePlaylistsDispatch()

  const [selecetedOptions, setSelectedOptions] = useState<string[]>(settings.selectedPlaylists.map((p) => p.id))

  useEffect(() => {
    if (!user) return

    const fetchAvailablePlaylists = async () => {
      setIsLoading(true)
      const playlists = await SpotifyApi.getUserPlaylistsAll(user.id, { filterLocal: true })
      const toRemove: string[] = []

      for (const { id } of settings.selectedPlaylists) {
        if (playlists.find((p) => p.id === id)) continue

        toRemove.push(id)
        playlistDispatch({ type: 'REMOVE_PLAYLIST', item: { id } })
      }

      settingsDispatch({
        type: 'UPDATE_SETTINGS',
        item: { ...settings, selectedPlaylists: settings.selectedPlaylists.filter((p) => !toRemove.includes(p.id)) },
      })

      setPlaylists(playlists)
      setIsLoading(false)
    }

    fetchAvailablePlaylists().catch(console.error)
  }, [])

  useEffect(() => {
    if (!selecetedOptions.length) {
      playlistDispatch({ type: 'REMOVE_ALL_PLAYLISTS', item: { withSavedPlaylist: false } })
      settingsDispatch({ type: 'UPDATE_SETTINGS', item: { ...settings, selectedPlaylists: [] } })
      return
    }

    const currentSavedPlaylists = settings.selectedPlaylists.map((p) => p.id)

    const toRemove = currentSavedPlaylists.filter((id) => !selecetedOptions.includes(id))
    const toAdd = selecetedOptions.filter((id) => !currentSavedPlaylists.includes(id))

    const updatePlaylists = async () => {
      setIsLoading(true)
      for (const id of toRemove) {
        playlistDispatch({ item: { id }, type: 'REMOVE_PLAYLIST' })
      }

      for (const id of toAdd) {
        const playlist = await SpotifyService.fetchAndConstructPlaylist(id)
        playlistDispatch({ item: playlist, type: 'ADD_PLAYLIST' })
      }

      settingsDispatch({
        type: 'UPDATE_SETTINGS',
        item: {
          ...settings,
          selectedPlaylists: [
            ...settings.selectedPlaylists.filter((p) => !toRemove.includes(p.id)),
            ...toAdd.map((i) => ({ id: i, bind: null })),
          ],
        },
      })
      setIsLoading(false)
    }

    updatePlaylists().catch(console.error)
  }, [selecetedOptions])

  return (
    <MultiSelect
      options={playlists.map((p) => ({ label: p.name, value: p.id }))}
      placeholder="Select playlists"
      selectedOptions={selecetedOptions}
      setSelectedOptions={setSelectedOptions}
      disabled={isLoading}
    />
  )
}
