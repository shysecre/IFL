import {
  AppState,
  AppStateAction,
  AppStateActions,
} from 'shared/types/app'

const initialState: AppState = { isUpdateLive: false }

export const appReducer = (
  state = initialState,
  action: AppStateAction
): AppState => {
  switch (action.type) {
    case AppStateActions.SET_UPDATE_LIVE:
      return { ...state, isUpdateLive: true }
    case AppStateActions.SET_UPDATE_OFFLINE:
      return { ...state, isUpdateLive: false }
    default:
      return { ...state }
  }
}
