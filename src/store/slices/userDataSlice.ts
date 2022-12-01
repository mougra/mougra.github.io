import { createSlice } from '@reduxjs/toolkit'
import { localStore } from '../localStore'

interface IUserData {
  usersId: number
  charactersData: number[]
  episodesData: number[]
  locationsData: number[]
}

const initialState: RegisterState = {
  usersData: localStore.get('DATA_USER') ?? [],
}

interface RegisterState {
  usersData: IUserData[]
}

export const userDataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    initData(state, action) {
      state.usersData.push({
        usersId: action.payload,
        charactersData: [],
        episodesData: [],
        locationsData: [],
      })
      localStore.set('DATA_USER', state.usersData)
    },

    addCharacterData(state, action) {
      state.usersData[action.payload.usersId].charactersData.push(
        action.payload.charactersData
      )
      localStore.set('DATA_USER', state.usersData)
    },
    removeCharacterData(state, action) {
      state.usersData[action.payload.usersId].charactersData.splice(
        action.payload.charactersData,
        1
      )
      localStore.set('DATA_USER', state.usersData)
    },

    addLocationData(state, action) {
      state.usersData[action.payload.usersId].locationsData.push(
        action.payload.locationsData
      )
      localStore.set('DATA_USER', state.usersData)
    },
    removeLocationData(state, action) {
      state.usersData[action.payload.usersId].locationsData.splice(
        action.payload.locationsData,
        1
      )
      localStore.set('DATA_USER', state.usersData)
    },

    addEpisodeData(state, action) {
      state.usersData[action.payload.usersId].episodesData.push(
        action.payload.episodesData
      )
      localStore.set('DATA_USER', state.usersData)
    },
    removeEpisodeData(state, action) {
      state.usersData[action.payload.usersId].episodesData.splice(
        action.payload.episodesData,
        1
      )
      localStore.set('DATA_USER', state.usersData)
    },
  },
})

export default userDataSlice.reducer
export const {
  initData,
  addCharacterData,
  removeCharacterData,
  addLocationData,
  removeLocationData,
  addEpisodeData,
  removeEpisodeData,
} = userDataSlice.actions
