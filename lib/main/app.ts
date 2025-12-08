import { BrowserWindow, shell, app, session, globalShortcut } from 'electron'
import { join } from 'path'
import { registerHttpProtocol, registerResourcesProtocol } from './protocols'
import { registerWindowHandlers } from '@/lib/conveyor/handlers/window-handler'
import { registerAppHandlers } from '@/lib/conveyor/handlers/app-handler'
import appIcon from '@/resources/icons/icon.png?asset'

export async function createAppWindow() {
  registerResourcesProtocol()
  registerHttpProtocol()

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https://*.spotifycdn.com  data: https://i.scdn.co res:; connect-src 'self' https://accounts.spotify.com https://api.spotify.com",
        ],
      },
    })
  })

  const mainWindow = new BrowserWindow({
    width: 900,
    minWidth: 750,
    height: 670,
    minHeight: 600,
    show: false,
    backgroundColor: '#1c1c1c',
    icon: appIcon,
    frame: false,
    titleBarStyle: 'hiddenInset',
    title: 'IFL',
    maximizable: false,
    resizable: true,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  registerWindowHandlers(mainWindow)
  registerAppHandlers(app, globalShortcut, mainWindow)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url).catch(console.error)
    return { action: 'deny' }
  })

  if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
    await mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    await mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}
