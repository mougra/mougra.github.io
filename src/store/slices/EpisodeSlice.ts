import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDataInfo, IEpisode } from '../../models/models'
import { localStore } from '../localStore'

const infoStateInitial: IDataInfo = {
  count: 0,
  pages: 0,
  next: '',
  prev: '',
}

interface LocationState {
  loadingEpis: boolean
  error: string
  episodesInfo: IDataInfo
  episodes: IEpisode[]
  favoritesEpisodes: IEpisode[]
  favoritesEpisodeOne: IEpisode
}

const initialState: LocationState = {
  loadingEpis: false,
  error: '',
  episodesInfo: infoStateInitial,
  episodes: [],
  favoritesEpisodes: [],
  favoritesEpisodeOne: localStore.get('FAVORITE_EPISODE')
    ? localStore.get('FAVORITE_EPISODE')
    : ({} as IEpisode),
}

export const episodeSlice = createSlice({
  name: 'episode',
  initialState,
  reducers: {
    fetching(state) {
      state.loadingEpis = true
    },
    fetchSuccess(state, action: PayloadAction<IEpisode[]>) {
      state.loadingEpis = false
      state.episodes = action.payload
      state.error = ''
    },
    fetchFavoritesSuccess(state, action: PayloadAction<IEpisode[]>) {
      state.loadingEpis = false
      state.favoritesEpisodes = action.payload
      state.error = ''
    },
    fetchFavoritesSuccessOne(state, action: PayloadAction<IEpisode>) {
      state.loadingEpis = false
      state.favoritesEpisodeOne = action.payload
      state.error = ''
      localStore.set('FAVORITE_EPISODE', state.favoritesEpisodeOne)
    },
    fetchInfo(state, action: PayloadAction<IDataInfo>) {
      state.episodesInfo = action.payload
    },
    fetchError(state, action: PayloadAction<Error>) {
      state.loadingEpis = false
      state.error = action.payload.message
    },
  },
})

export default episodeSlice.reducer
