import { Settings } from '@/app/types/local'

export interface SettingsReducerActionMap {
  UPDATE_SETTINGS: Settings
}

export type SettingsReducerAction = {
  [K in keyof SettingsReducerActionMap]: { type: K; item: SettingsReducerActionMap[K] }
}[keyof SettingsReducerActionMap]
