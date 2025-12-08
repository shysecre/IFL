import { ConveyorApi } from '@/lib/preload/shared'

export class WindowApi extends ConveyorApi {
  // Generate window methods
  windowInit = () => this.invoke('window-init')
  windowIsMinimizable = () => this.invoke('window-is-minimizable')
  windowMinimize = () => this.invoke('window-minimize')
  windowClose = () => this.invoke('window-close')

  // Generate web methods
  webToggleDevtools = () => this.invoke('web-toggle-devtools')
  webOpenUrl = (url: string) => this.invoke('web-open-url', url)
}
