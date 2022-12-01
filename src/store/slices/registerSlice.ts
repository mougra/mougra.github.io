import { createSlice } from '@reduxjs/toolkit'
import { IRegister } from '../../models/models'
import { localStore } from '../localStore'

const initialState: RegisterState = {
  registrationUsers: localStore.get('REGISTER_USER') ?? [],
}

interface RegisterState {
  registrationUsers: IRegister[]
}

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    registrationUser(state, action) {
      state.registrationUsers.push({
        email: action.payload.email,
        login: action.payload.login,
        firstName: action.payload.firstName,
        secondName: action.payload.secondName,
        password: action.payload.password,
        repeatPassword: action.payload.repeatPassword,
      })
      if (localStore.get('REGISTER_USER')) {
        // const registrationUsers = localStore.get('REGISTER_USER')
        // registrationUsers.push(state.registrationUsers)
        // registrationUsers.flat()
        // console.log(registrationUsers)
        // .flat()
        localStore.set('REGISTER_USER', state.registrationUsers)
      } else {
        localStore.set('REGISTER_USER', state.registrationUsers)
      }
    },
  },
})

export default registrationSlice.reducer
export const { registrationUser } = registrationSlice.actions
