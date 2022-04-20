import { Dispatch } from "react";
import { AppStateAction, AppStateActions } from "shared/types/appState";

export const setUpdateLive = () => {
  return async (dispatch: Dispatch<AppStateAction>) => {
    dispatch({ type: AppStateActions.SET_UPDATE_LIVE });
  };
};

export const setUpdateOffline = () => {
  return async (dispatch: Dispatch<AppStateAction>) => {
    dispatch({ type: AppStateActions.SET_UPDATE_OFFLINE });
  };
};
