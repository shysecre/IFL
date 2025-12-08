import { SettingsReducerAction, Settings } from '@/app/types'
import { setSettings } from '@/app/utils'

export const settingsReducer = (settings: Settings, { item, type }: SettingsReducerAction) => {
  switch (type) {
    case 'UPDATE_SETTINGS': {
      settings = item
      setSettings(item)
      break
    }
  }

  return settings
}
