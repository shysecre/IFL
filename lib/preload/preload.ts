import { contextBridge } from 'electron'
import { conveyor } from '@/lib/conveyor/api'
import { ipc } from '../ipc'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('conveyor', conveyor)
    contextBridge.exposeInMainWorld('ipc', ipc)
  } catch (error) {
    console.error(error)
  }
} else {
  window.conveyor = conveyor
  window.ipc = ipc
}
