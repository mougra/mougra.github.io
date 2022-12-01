import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDataInfo, ILocation } from '../../models/models'
import { localStore } from '../localStore'

const infoStateInitial: IDataInfo = {
  count: 0,
  pages: 0,
  next: '',
  prev: '',
}

interface LocationState {
  loadingLoc: boolean
  error: string
  locationsInfo: IDataInfo
  locations: ILocation[]
  favoritesLocations: ILocation[]
  favoritesLocationsOne: ILocation
}

const initialState: LocationState = {
  loadingLoc: false,
  error: '',
  locationsInfo: infoStateInitial,
  locations: [],
  favoritesLocations: [],
  favoritesLocationsOne: localStore.get('FAVORITE_LOCATION')
    ? localStore.get('FAVORITE_LOCATION')
    : ({} as ILocation),
}

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    fetching(state) {
      state.loadingLoc = true
    },
    fetchSuccess(state, action: PayloadAction<ILocation[]>) {
      state.loadingLoc = false
      state.locations = action.payload
      state.error = ''
    },
    fetchFavoritesSuccess(state, action: PayloadAction<ILocation[]>) {
      state.loadingLoc = false
      state.favoritesLocations = action.payload
      state.error = ''
    },
    fetchFavoritesSuccessOne(state, action: PayloadAction<ILocation>) {
      state.loadingLoc = false
      state.favoritesLocationsOne = action.payload
      state.error = ''
      localStore.set('FAVORITE_LOCATION', state.favoritesLocationsOne)
    },
    fetchInfo(state, action: PayloadAction<IDataInfo>) {
      state.locationsInfo = action.payload
    },
    fetchError(state, action: PayloadAction<Error>) {
      state.loadingLoc = false
      state.error = action.payload.message
    },
  },
})

export default locationSlice.reducer
