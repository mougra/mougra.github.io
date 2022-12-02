import { AppDispatch } from '..'
import axios from '../../axios'
import { ServerResponse } from '../../models/models'
import { ICharacter } from './../../models/models'
import { characterSlice } from './../slices/CharacterSlice'

export const fetchCharacters = (
  page: number = 1,
  name: string = '',
  species: string = '',
  status: string = ''
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(characterSlice.actions.fetching())
      const responseCharacters = await axios.get<ServerResponse<ICharacter>>(
        'character',
        {
          params: { page, name, species, status },
        }
      )
      dispatch(
        characterSlice.actions.fetchSuccess(responseCharacters.data.results)
      )
      dispatch(characterSlice.actions.fetchInfo(responseCharacters.data.info))
      console.log('fetchCharacters', responseCharacters.data.results)
    } catch (e) {
      dispatch(characterSlice.actions.fetchError(e as Error))
    }
  }
}

export const fetchCharactersFavorite = (arr: number[] = []) => {
  return async (dispatch: AppDispatch) => {
    try {
      const responseCharacters = await axios.get<ICharacter[]>(
        `character/${arr}`
      )
      dispatch(characterSlice.actions.fetching())

      dispatch(
        characterSlice.actions.fetchFavoritesSuccess(responseCharacters.data)
      )
    } catch (e) {
      dispatch(characterSlice.actions.fetchError(e as Error))
    }
  }
}
