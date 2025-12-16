import { type App, BrowserWindow, GlobalShortcut } from 'electron'
import { handle } from '@/lib/main/shared'
import { AppEvents } from '@/lib/ipc/constants'

export const registerAppHandlers = (app: App, globalShortcut: GlobalShortcut, window: BrowserWindow) => {
  // App operations
  handle('version', () => app.getVersion())

  // TODO: Rewrite this stupid logic
  handle('registerBind', (bind, playlistId) => {
    console.warn(`Registering bind ${bind} for ${playlistId} playlist`)

    const callback = (playlistId: string) => {
      window.webContents.send(AppEvents.RECEIVE_BIND_PRESS, bind, playlistId)
    }

    globalShortcut.register(bind, () => callback(playlistId))
  })

  handle('unregisterAll', () => globalShortcut.unregisterAll())

  handle('unregisterBind', (bind) => globalShortcut.unregister(bind))
}
