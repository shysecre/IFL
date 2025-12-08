import { ipcRenderer } from 'electron'
import { RendererChannel, Listener } from './types'

export const ipc = {
  on<C extends RendererChannel>(channel: C, listener: Listener<C>) {
    ipcRenderer.on(channel, listener)
  },

  off<C extends RendererChannel>(channel: C, listener: Listener<C>) {
    ipcRenderer.off(channel, listener)
  },
}

export type Ipc = typeof ipc
