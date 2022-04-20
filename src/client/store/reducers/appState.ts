import {
  AppState,
  AppStateAction,
  AppStateActions,
} from "shared/types/appState";

const initialState: AppState = { isUpdateLive: false };

export const currentAppStateReducer = (
  state = initialState,
  action: AppStateAction
): AppState => {
  switch (action.type) {
    case AppStateActions.SET_UPDATE_LIVE:
      return { ...state, isUpdateLive: true };
    case AppStateActions.SET_UPDATE_OFFLINE:
      return { ...state, isUpdateLive: false };
    default:
      return { ...state };
  }
};
