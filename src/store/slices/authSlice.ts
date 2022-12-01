import { createSlice } from '@reduxjs/toolkit'
import { localStore } from '../localStore'

const initialState: AuthState = {
  authLoginOrEmail: localStore.get('LOGIN_USER')
    ? localStore.get('LOGIN_USER').authLoginOrEmail
    : '',
  authPassword: '',
  isAuth: localStore.get('LOGIN_USER')
    ? localStore.get('LOGIN_USER').isAuth
    : false,
  userId: localStore.get('LOGIN_USER')
    ? localStore.get('LOGIN_USER').userId
    : 0,
}

interface AuthState {
  authLoginOrEmail: string
  authPassword: string
  isAuth: boolean
  userId: number
}

export const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.authLoginOrEmail = action.payload.authLoginOrEmail
      state.authPassword = action.payload.authPassword
      state.isAuth = Boolean(action.payload.authLoginOrEmail)
      state.userId = action.payload.userId
      if (action.payload.save) {
        localStore.set('LOGIN_USER', {
          authLoginOrEmail: state.authLoginOrEmail,
          authPassword: state.authPassword,
          isAuth: state.isAuth,
          userId: state.userId,
        })
      }
    },
    logoutUser(state) {
      state.authLoginOrEmail = ''
      state.authPassword = ''
      state.isAuth = false
      state.userId = 0

      localStore.set('LOGIN_USER', {
        authLoginOrEmail: '',
        authPassword: '',
        isAuth: false,
        userId: 0,
      })
    },
  },
})

export default authSlice.reducer
export const { loginUser, logoutUser } = authSlice.actions
