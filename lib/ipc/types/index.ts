import { IpcRendererEvent } from 'electron'

interface IpcRendererChannels {
  code: [string]
  ['receive-bind-press']: [string, string]
}

export type RendererChannel = keyof IpcRendererChannels
export type RendererChannelArgs<C extends RendererChannel> = IpcRendererChannels[C]

export type Listener<C extends RendererChannel> = (event: IpcRendererEvent, ...args: RendererChannelArgs<C>) => unknown
