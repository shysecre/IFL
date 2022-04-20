import { combineReducers } from "redux";
import { currentAppStateReducer } from "./appState";
import { currentUserReducer } from "./currentUserReducer";
import { playlistReducer } from "./playlistReducer";

export const rootReducer = combineReducers({
  playlist: playlistReducer,
  currentUser: currentUserReducer,
  appState: currentAppStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
