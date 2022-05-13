import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { SelectedPlaylist } from 'shared/types/user'

export interface PlaylistProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  playlist: SelectedPlaylist
}
