import { PlaylistReducerItemTrack } from '@/app/types'
import React from 'react'

interface PlaylistCardContentItemProps extends React.HTMLProps<HTMLDivElement> {
  track: PlaylistReducerItemTrack | null | undefined
}

export const PlaylistCardContentItem = ({ track }: PlaylistCardContentItemProps) => {
  return track ? (
    <div className="flex gap-2 h-full items-center">
      <img className="w-14 h-14 rounded-2xl border-2" src={track.image} />
      <div className="flex flex-col overflow-hidden">
        <span className="truncate text-2xl">{track.title}</span>
        <span className="truncate text-gray-200 opacity-50">{track.artist}</span>
      </div>
    </div>
  ) : (
    <div className="text-[16px] h-full flex items-center justify-center">Empty</div>
  )
}
