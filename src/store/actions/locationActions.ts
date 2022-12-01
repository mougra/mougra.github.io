import { AppDispatch } from '..'
import axios from '../../axios'
import { ServerResponse } from '../../models/models'
import { locationSlice } from '../slices/LocationSlice'
import { ILocation } from './../../models/models'

export const fetchLocations = (
  page: number = 1,
  name: string = '',
  type: string = '',
  dimension: string = ''
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(locationSlice.actions.fetching())
      const responseLocations = await axios.get<ServerResponse<ILocation>>(
        'location',
        {
          params: { page, name, type, dimension },
        }
      )
      dispatch(
        locationSlice.actions.fetchSuccess(responseLocations.data.results)
      )
      dispatch(locationSlice.actions.fetchInfo(responseLocations.data.info))
    } catch (e) {
      dispatch(locationSlice.actions.fetchError(e as Error))
    }
  }
}

export const fetchLocationsFavorite = (arr: number[] = []) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(locationSlice.actions.fetching())
      const responseLocationOne = await axios.get<ILocation>(
        `location/${arr[0]}`
      )
      dispatch(
        locationSlice.actions.fetchFavoritesSuccessOne(responseLocationOne.data)
      )
      dispatch(locationSlice.actions.fetching())
      const responseLocations = await axios.get<ILocation[]>(`location/${arr}`)
      dispatch(
        locationSlice.actions.fetchFavoritesSuccess(responseLocations.data)
      )
    } catch (e) {
      dispatch(locationSlice.actions.fetchError(e as Error))
    }
  }
}
