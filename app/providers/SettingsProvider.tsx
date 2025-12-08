import { settingsReducer } from '@/app/reducers'
import { SettingsReducerAction, Settings } from '@/app/types'
import { getSettings } from '@/app/utils'
import React, { ActionDispatch, createContext, useReducer } from 'react'

export const SettingsContext = createContext<Settings>(getSettings())
export const SettingsDispatchContext = createContext<ActionDispatch<[SettingsReducerAction]> | null>(null)

export const SettingsProvider = ({ children }: React.HTMLProps<HTMLDivElement>) => {
  const [settings, dispatch] = useReducer(settingsReducer, getSettings())

  return (
    <SettingsContext.Provider value={settings}>
      <SettingsDispatchContext.Provider value={dispatch}>{children}</SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  )
}
