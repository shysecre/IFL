import { config } from 'dotenv'
import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Notification,
  autoUpdater,
} from 'electron'
import electronIsDev from 'electron-is-dev'
import { createWindow, envPath } from './utils'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

if (require('electron-squirrel-startup')) {
  app.quit()
}

config({ path: envPath() })

app
  .on('ready', () => {
    const win = createWindow(
      MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      MAIN_WINDOW_WEBPACK_ENTRY
    )

    if (!electronIsDev) {
      const feed = `${process.env.SERVER_URL}/update/${
        process.platform
      }/${app.getVersion()}`

      autoUpdater.setFeedURL({ url: feed })
      autoUpdater.checkForUpdates()

      setInterval(() => {
        autoUpdater.checkForUpdates()
      }, 5 * 60 * 1000)

      autoUpdater.on('update-downloaded', () => {
        win.webContents.send('Rupdate-available', true)
      })

      autoUpdater.on('error', () => {
        console.log('ERROR!')
      })
    }

    ipcMain
      .on('hide-window', () => {
        win.minimize()
      })
      .on('hide-window-to-tray', () => {
        win.hide()
      })
      .on('new-track', (event, data) => {
        new Notification({
          title: data.title,
          body: data.body,
        }).show()
      })
      .on('need-to-update', () => {
        app.exit(0)
      })
      .on('set-bind', (event, data) => {
        globalShortcut.register(data.bind, () => {
          const playlistId = data.playlistId

          win.webContents.send(`add-track-${playlistId}`, playlistId)
        })
      })
      .on('delete-bind', (event, data) => {
        if (globalShortcut.isRegistered(data.bind))
          globalShortcut.unregister(data.bind)
      })
  })
  .on('window-all-closed', () => {
    if (process.platform === 'darwin') return

    app.quit()
  })
  .on('activate', () => {
    if (BrowserWindow.getAllWindows().length) return

    createWindow(MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY, MAIN_WINDOW_WEBPACK_ENTRY)
  })
  .setName('IFL')
