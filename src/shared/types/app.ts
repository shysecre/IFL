export interface AppState {
  isUpdateLive: boolean;
}

export interface SetUpdateLive {
  type: AppStateActions.SET_UPDATE_LIVE;
}

export interface SetUpdateOffline {
  type: AppStateActions.SET_UPDATE_OFFLINE;
}

export type AppStateAction = SetUpdateLive | SetUpdateOffline;

export enum AppStateActions {
  SET_UPDATE_LIVE = "SET_UPDATE_LIVE",
  SET_UPDATE_OFFLINE = "SET_UPDATE_OFFLINE",
}
