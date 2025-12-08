import { PlaylistCardBindDialog } from '@/app/routes/home/components/playlist-card/PlaylistCardBindDialog'
import { PlaylistReducerItem } from '@/app/types'
import { cn } from '@/lib/utils'
import React from 'react'

interface PlaylistCardHeaderProps extends React.HTMLProps<HTMLDivElement> {
  playlist: PlaylistReducerItem
}

export const PlaylistCardHeader = ({ playlist, className, ...props }: PlaylistCardHeaderProps) => {
  return (
    <div className={cn('relative flex justify-center items-center h-full', className)} {...props}>
      <img className="rounded-t-2xl absolute h-full w-full blur-xs object-cover opacity-25" src={playlist.image} />
      <span className="text-2xl z-0">{playlist.name}</span>
      <div className="absolute bottom-0">
        <PlaylistCardBindDialog playlist={playlist} />
      </div>
    </div>
  )
}
