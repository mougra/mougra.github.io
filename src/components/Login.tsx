import React, { useState } from 'react'
import { useAppDispatch } from '../hook/redux'
import { loginUser } from './../store/slices/authSlice'
import PassordSeeImg from '../assets/image/passwordsee.svg'
import PassordUnSeeImg from '../assets/image/passwordunsee.svg'
import rickAuth from '../assets/image/rickAuth.svg'
import rickAuthTop from '../assets/image/rickAuthTop.svg'
import mortyAuth from '../assets/image/mortyAuth.svg'
import errorSVG from '../assets/image/errorsvg.svg'
import { useInput } from '../hook/input'
import { localStore } from '../store/localStore'

interface ModalProps {
  login: boolean
  setLogin(active: boolean): void
}

const Login = ({ login, setLogin }: ModalProps) => {
  const dispatch = useAppDispatch()
  const [passwordSee, setPasswordSee] = useState(false)
  const [saveStorage, setsaveStorage] = useState(false)

  const authLoginEmail = useInput('', {
    isEmpty: true,
    minLength: 6,
    maxLength: 50,
  })
  const authPassword = useInput('', {
    isEmpty: true,
    minLength: 6,
    maxLength: 50,
    isPassword: true,
  })

  function missingHandler() {
    if (localStore.get('REGISTER_USER')) {
      const registrationUsers = localStore.get('REGISTER_USER')
      for (let i = 0; i < registrationUsers.length; i++) {
        if (
          (registrationUsers[i].email === authLoginEmail.value &&
            registrationUsers[i].password === authPassword.value) ||
          (registrationUsers[i].password === authPassword.value &&
            registrationUsers[i].login) === authLoginEmail.value
        ) {
          return true
        }
      }
    }
    return false
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    if (localStore.get('REGISTER_USER')) {
      const registrationUsers = localStore.get('REGISTER_USER')
      for (let i = 0; i < registrationUsers.length; i++) {
        if (
          (registrationUsers[i].email === authLoginEmail.value &&
            registrationUsers[i].password === authPassword.value) ||
          (registrationUsers[i].password === authPassword.value &&
            registrationUsers[i].login) === authLoginEmail.value
        ) {
          dispatch(
            loginUser({
              authLoginOrEmail: authLoginEmail.value,
              authPassword: authPassword.value,
              userId: i,
              save: saveStorage,
            })
          )
        }
      }
    }

    setLogin(false)
    authLoginEmail.removeValue()
    authPassword.removeValue()
  }

  return (
    <div
      className={login ? 'modal active' : 'modal'}
      onClick={() => {
        setLogin(false)
      }}
    >
      <div
        className={login ? 'modal__content active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={rickAuth}
          alt='rick'
          className='absolute left-[-225px] top-[80px] content-none -z-10'
        />
        <img
          src={rickAuthTop}
          alt='ricktop'
          className='absolute left-[95px] top-[-160px] content-none -z-10'
        />
        <img
          src={mortyAuth}
          alt='morty'
          className='absolute right-[-175px] top-[-30px] content-none -z-10'
        />
        <div className='flex flex-col gap-y-[48px] py-9 px-5 items-center bg-white test_border'>
          <h2 className='text-5xl'>Вход</h2>
          <form
            className='flex flex-col items-start gap-y-[35px]'
            onSubmit={submitHandler}
          >
            <div className='input_container'>
              <input
                type='text'
                value={authLoginEmail.value}
                onChange={(e) => authLoginEmail.onChange(e)}
                onBlur={(e) => authLoginEmail.onBlur(e)}
                placeholder='Введите логин или E-mail'
                className={
                  authLoginEmail.isDirty && !authLoginEmail.inputValid
                    ? 'auth__input auth__text p-[10px] min-w-[331px]  invalid'
                    : 'auth__input auth__text p-[10px] min-w-[331px]'
                }
              />
              {authLoginEmail.isDirty && !authLoginEmail.inputValid && (
                <div className='error_input flex gap-2 px-3 py-0.5'>
                  <img src={errorSVG} alt='error' />
                  {authLoginEmail.logError}
                </div>
              )}
              {authPassword.isDirty && !missingHandler() && (
                <div className='error_input flex gap-2 px-3 py-0.5'>
                  <img src={errorSVG} alt='error' />
                  incorrect login or password
                </div>
              )}
            </div>

            <div className='relative input_container'>
              <input
                type={passwordSee ? 'text' : 'password'}
                value={authPassword.value}
                onChange={(e) => authPassword.onChange(e)}
                onBlur={(e) => authPassword.onBlur(e)}
                placeholder='Введите  пароль'
                className={
                  authPassword.isDirty && !authPassword.inputValid
                    ? 'auth__input auth__text p-[10px] min-w-[331px] invalid'
                    : 'auth__input auth__text p-[10px] min-w-[331px]'
                }
              />
              <img
                src={passwordSee ? PassordSeeImg : PassordUnSeeImg}
                alt='watch_passord'
                className='absolute right-[15px] top-[8px] content-none'
                onClick={() => {
                  passwordSee ? setPasswordSee(false) : setPasswordSee(true)
                }}
              />
              {authPassword.isDirty && !authPassword.inputValid && (
                <div className='error_input flex gap-2 px-3 py-0.5'>
                  <img src={errorSVG} alt='error' />
                  {authPassword.logError}
                </div>
              )}
            </div>
            <div className='flex gap-2.5 text-sm'>
              <input
                type='checkbox'
                id='reg_checkbox'
                name='reg_checkbox'
                onChange={() => setsaveStorage(true)}
              />
              <label htmlFor='reg_checkbox' className='select-none'>
                Запомнить
              </label>
              <span></span>
            </div>
            <button
              disabled={
                !authLoginEmail.inputValid ||
                !authPassword.inputValid ||
                !missingHandler()
              }
              className='auth__button max-w-[100%] mx-auto '
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
