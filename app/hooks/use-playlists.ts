import { PlaylistsContext, PlaylistsDispatchContext } from '@/app/providers'
import { useContext } from 'react'

export const usePlaylists = () => {
  const ctx = useContext(PlaylistsContext)

  if (!ctx) {
    throw new Error('usePlaylists should be used inside PlaylistsContext')
  }

  return ctx
}

export const usePlaylistsDispatch = () => {
  const ctx = useContext(PlaylistsDispatchContext)

  if (!ctx) {
    throw new Error('usePlaylistsDispatch should be used inside PlaylistsDispatchContext')
  }

  return ctx
}
