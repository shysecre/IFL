import { combineReducers } from 'redux'
import { appReducer } from './app'
import { userReducer } from './user'

export const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
})

export type RootState = ReturnType<typeof rootReducer>
