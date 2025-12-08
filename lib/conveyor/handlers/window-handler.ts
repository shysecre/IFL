import type { BrowserWindow } from 'electron'
import { shell } from 'electron'
import { handle } from '@/lib/main/shared'
import { electronAPI } from '@electron-toolkit/preload'

export const registerWindowHandlers = (window: BrowserWindow) => {
  // Window operations
  handle('window-init', () => {
    const { width, height } = window.getBounds()
    const minimizable = window.isMinimizable()
    const platform = electronAPI.process.platform

    return { width, height, minimizable, platform }
  })

  handle('window-is-minimizable', () => window.isMinimizable())
  handle('window-minimize', () => window.minimize())
  handle('window-close', () => window.close())

  // Web content operations
  const webContents = window.webContents

  handle('web-toggle-devtools', () => webContents.toggleDevTools())
  handle('web-open-url', (url: string) => shell.openExternal(url))
}
