import { playlistReducer } from '@/app/reducers'
import { PlaylistReducerItem, PlaylistReducerAction } from '@/app/types'
import React, { ActionDispatch, createContext, useReducer } from 'react'

export const PlaylistsContext = createContext<PlaylistReducerItem[]>([])
export const PlaylistsDispatchContext = createContext<ActionDispatch<[PlaylistReducerAction]> | null>(null)

export const PlaylistsProvider = ({ children }: React.HTMLProps<HTMLDivElement>) => {
  const [playlists, dispatch] = useReducer(playlistReducer, [])

  return (
    <PlaylistsContext.Provider value={playlists}>
      <PlaylistsDispatchContext.Provider value={dispatch}>{children}</PlaylistsDispatchContext.Provider>
    </PlaylistsContext.Provider>
  )
}
