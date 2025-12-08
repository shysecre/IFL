import { Button } from '@/app/components/ui'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog'
import { useSettings, useSettingsDispatch, usePlaylistsDispatch, useConveyor } from '@/app/hooks'
import { PlaylistReducerItem } from '@/app/types'
import React, { KeyboardEvent, useState } from 'react'

interface PlaylistCardBindDialogProps extends React.HTMLProps<HTMLDivElement> {
  playlist: PlaylistReducerItem
}

export const PlaylistCardBindDialog = ({ playlist }: PlaylistCardBindDialogProps) => {
  const [bind, setBind] = useState('')
  const dispatchPlaylist = usePlaylistsDispatch()
  const settings = useSettings()
  const settingsDispatch = useSettingsDispatch()
  const { registerBind, unregisterBind } = useConveyor('app')

  const onChange = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key.toUpperCase()
    const ctrl = event.ctrlKey ? 'Control+' : ''
    const alt = event.altKey ? 'Alt+' : ''
    const shift = event.shiftKey ? 'Shift+' : ''

    if (['CONTROL', 'ALT', 'SHIFT'].includes(key)) return

    const finalBind = `${shift}${alt}${ctrl}${key}`

    setBind(finalBind)
  }

  const onSave = () => {
    const prevBind = playlist.bind

    dispatchPlaylist({ item: { id: playlist.id, bind }, type: 'UPDATE_BIND' })

    const isAnyPlaylistWithPrevBind = settings.selectedPlaylists.some((p) => p.bind === prevBind)

    if (!isAnyPlaylistWithPrevBind && prevBind) {
      unregisterBind(prevBind).catch(console.error)
    }

    if (playlist.isFavoritePlaylist) {
      settingsDispatch({ type: 'UPDATE_SETTINGS', item: { ...settings, favoritePlaylistBind: bind } })
    } else {
      const p = settings.selectedPlaylists.find((p) => p.id === playlist.id)

      if (!p) return

      p.bind = bind

      settingsDispatch({ type: 'UPDATE_SETTINGS', item: settings })
    }

    if (bind) registerBind(bind, playlist.id).catch(console.error)
  }

  return (
    <Dialog onOpenChange={() => setBind('')}>
      <DialogTrigger asChild>
        <span className="hover:cursor-pointer">Bind: {playlist.bind ?? 'click to set'}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {playlist.bind ? 'Edit bind' : 'Set bind'} for {playlist.name}
          </DialogTitle>
          <DialogDescription>Click on input below and then press a combination!</DialogDescription>
        </DialogHeader>
        <input
          className="border-2 rounded-[10px] focus:outline-none h-8 p-2 font-bold"
          placeholder="Bind"
          value={bind}
          onKeyDownCapture={onChange}
          onChange={() => {}}
          spellCheck={false}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={onSave}>Save bind</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
