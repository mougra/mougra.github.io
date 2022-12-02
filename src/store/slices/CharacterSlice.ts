import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICharacter, IDataInfo } from '../../models/models'

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
}

const initialState: CharacterState = {
  loading: false,
  error: '',
  charactersInfo: infoStateInitial,
  characters: [],
  favoritesCharacters: [],
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
