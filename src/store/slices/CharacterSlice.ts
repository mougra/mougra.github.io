import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICharacter, IDataInfo } from '../../models/models'
import { localStore } from '../localStore'

const infoStateInitial: IDataInfo = {
  count: 0,
  pages: 0,
  next: '',
  prev: '',
}
interface CharacterState {
  loading: boolean
  error: string
  charactersInfo: IDataInfo
  characters: ICharacter[]
  favoritesCharacters: ICharacter[]
  favoritesCharactersOne: ICharacter
}

const initialState: CharacterState = {
  loading: false,
  error: '',
  charactersInfo: infoStateInitial,
  characters: [],
  favoritesCharacters: [],
  favoritesCharactersOne: localStore.get('FAVORITE_CHARACTER')
    ? localStore.get('FAVORITE_CHARACTER')
    : ({} as ICharacter),
}

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true
    },
    fetchSuccess(state, action: PayloadAction<ICharacter[]>) {
      state.loading = false
      state.characters = action.payload
      state.error = ''
    },
    fetchFavoritesSuccess(state, action: PayloadAction<ICharacter[]>) {
      state.loading = false
      state.favoritesCharacters = action.payload
      state.error = ''
    },
    fetchFavoritesSuccessOne(state, action: PayloadAction<ICharacter>) {
      state.loading = false
      state.favoritesCharactersOne = action.payload
      state.error = ''
      localStore.set('FAVORITE_CHARACTER', state.favoritesCharactersOne)
    },
    fetchInfo(state, action: PayloadAction<IDataInfo>) {
      state.charactersInfo = action.payload
    },
    fetchError(state, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    },
  },
})

export default characterSlice.reducer
