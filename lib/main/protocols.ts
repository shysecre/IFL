import { app, net, protocol } from 'electron'
import path, { join } from 'path'
import { pathToFileURL } from 'url'

export function registerResourcesProtocol() {
  protocol.handle('res', async (request) => {
    try {
      const url = new URL(request.url)
      const fullPath = join(url.hostname, url.pathname.slice(1))
      const filePath = join(__dirname, '../../resources', fullPath)
      return net.fetch(pathToFileURL(filePath).toString())
    } catch (error) {
      console.error('Protocol error:', error)
      return new Response('Resource not found', { status: 404 })
    }
  })
}

export function registerHttpProtocol() {
  const protocol = 'ifl'

  if (app.isDefaultProtocolClient(protocol)) {
    return
  }

  if (process.platform === 'win32') {
    if (app.isPackaged) {
      app.setAsDefaultProtocolClient(protocol, process.execPath)
    } else {
      app.setAsDefaultProtocolClient(protocol, process.execPath, [path.resolve(process.argv[1])])
    }
  } else {
    app.setAsDefaultProtocolClient(protocol)
  }
}
