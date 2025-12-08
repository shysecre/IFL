import { app, BrowserWindow, Event, globalShortcut } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createAppWindow } from './app'

const lock = app.requestSingleInstanceLock()

if (!lock) {
  app.quit()
  process.exit(0)
}

let mainWindow: BrowserWindow | null = null

// TODO: Add support for starting app by using ifl:// protocol

app
  .whenReady()
  .then(async () => {
    electronApp.setAppUserModelId('com.electron')
    app.on('open-url', handleSpotifyCallback)
    app.on('second-instance', handleSpotifyCallback)

    if (!mainWindow) {
      mainWindow = await createAppWindow()
    }

    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    app.on('activate', async () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        await createAppWindow()
      }
    })
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function handleSpotifyCallback(event: Event, arg: string | string[]) {
  let url: URL | undefined

  // Means this function were called from Windows/Linux
  if (Array.isArray(arg)) {
    const protocolUrl = arg.find((s) => s.startsWith('ifl://'))

    if (protocolUrl) {
      url = new URL(protocolUrl)
    }
  } else {
    // Means this function were called from MacOs
    event.preventDefault()
    url = new URL(arg)
  }

  if (!url) return

  const code = url.searchParams.get('code')

  if (!code) return

  if (mainWindow) {
    mainWindow.webContents.send('code', code)

    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    }

    mainWindow.focus()
  }
}
