import { AppDispatch } from '..'
import axios from '../../axios'
import { IEpisode, ServerResponse } from '../../models/models'
import { episodeSlice } from '../slices/EpisodeSlice'

export const fetchEpisodes = (
  page: number = 1,
  name: string = '',
  episode: string = ''
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(episodeSlice.actions.fetching())
      const responseEpisodes = await axios.get<ServerResponse<IEpisode>>(
        'episode',
        {
          params: { page, name, episode },
        }
      )
      dispatch(episodeSlice.actions.fetchSuccess(responseEpisodes.data.results))
      dispatch(episodeSlice.actions.fetchInfo(responseEpisodes.data.info))
    } catch (e) {
      dispatch(episodeSlice.actions.fetchError(e as Error))
    }
  }
}

export const fetchEpisodesFavorite = (arr: number[] = []) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(episodeSlice.actions.fetching())
      const responseEpisodeOne = await axios.get<IEpisode>(`episode/${arr[0]}`)
      dispatch(
        episodeSlice.actions.fetchFavoritesSuccessOne(responseEpisodeOne.data)
      )
      dispatch(episodeSlice.actions.fetching())
      const responseEpisodes = await axios.get<IEpisode[]>(`episode/${arr}`)
      dispatch(
        episodeSlice.actions.fetchFavoritesSuccess(responseEpisodes.data)
      )
    } catch (e) {
      dispatch(episodeSlice.actions.fetchError(e as Error))
    }
  }
}
