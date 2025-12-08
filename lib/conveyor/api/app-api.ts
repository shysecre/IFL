import { ConveyorApi } from '@/lib/preload/shared'

export class AppApi extends ConveyorApi {
  version = () => this.invoke('version')
  registerBind = (bind: string, playlistId: string) => this.invoke('registerBind', bind, playlistId)
  unregisterAll = () => this.invoke('unregisterAll')
  unregisterBind = (bind: string) => this.invoke("unregisterBind", bind)
}
