import { PlaylistCardContent } from '@/app/routes/home/components/playlist-card/PlaylistCardContent'
import { PlaylistCardContentItem } from '@/app/routes/home/components/playlist-card/PlaylistCardContentItem'
import { PlaylistCardHeader } from '@/app/routes/home/components/playlist-card/PlaylistCardHeader'
import { PlaylistReducerItem } from '@/app/types'
import { cn } from '@/lib/utils'
import React from 'react'

interface PlaylistCardProps extends React.HTMLProps<HTMLDivElement> {
  playlist: PlaylistReducerItem
}

export const PlaylistCard = ({ playlist, className, ...props }: PlaylistCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn('flex flex-col border-2 rounded-2xl shadow-2xl shadow-background w-56 h-56', className)}
        {...props}
      >
        <PlaylistCardHeader playlist={playlist} />
        <PlaylistCardContent>
          <PlaylistCardContentItem track={playlist.tracks[0]} />
        </PlaylistCardContent>
      </div>
    </div>
  )
}
