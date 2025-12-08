import type { Ipc } from '.'

declare global {
  interface Window {
    ipc: Ipc
  }
}
