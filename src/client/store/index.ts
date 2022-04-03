import { applyMiddleware, createStore } from "redux";
import { rootReducer, RootState } from "./reducers";
import thunk from "redux-thunk";

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type GetState = () => RootState;
