import { combineReducers, configureStore } from '@reduxjs/toolkit'
import characterReducer from './slices/CharacterSlice'
import locationReducer from './slices/LocationSlice'
import episodeReducer from './slices/EpisodeSlice'
import registrationReducer from './slices/registerSlice'
import authReducer from './slices/authSlice'
import userDataReducer from './slices/userDataSlice'

const rootReducer = combineReducers({
  character: characterReducer,
  location: locationReducer,
  episode: episodeReducer,
  registration: registrationReducer,
  auth: authReducer,
  data: userDataReducer,
})

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
