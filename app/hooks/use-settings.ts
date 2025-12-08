import { SettingsContext, SettingsDispatchContext } from '@/app/providers'
import { useContext } from 'react'

export const useSettings = () => {
  const ctx = useContext(SettingsContext)

  if (!ctx) {
    throw new Error('useSettings should be used inside SettingsContext')
  }

  return ctx
}

export const useSettingsDispatch = () => {
  const ctx = useContext(SettingsDispatchContext)

  if (!ctx) {
    throw new Error('useSettingsDispatch should be used inside SettingsDispatchContext')
  }

  return ctx
}
