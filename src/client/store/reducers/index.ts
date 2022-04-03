import { combineReducers } from "redux";
import { currentUserReducer } from "./currentUserReducer";
import { playlistReducer } from "./playlistReducer";

export const rootReducer = combineReducers({
  playlist: playlistReducer,
  currentUser: currentUserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
