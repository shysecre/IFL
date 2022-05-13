import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isAddingNewPlaylist?: boolean
  displayModal: boolean
  displayRefreshButton?: boolean
  setDisplayModal: (display: boolean) => void
  refreshPlaylists?: () => void
}