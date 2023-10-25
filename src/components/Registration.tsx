import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { registrationUser } from './../store/slices/registerSlice'
import PassordSeeImg from '../assets/image/passwordsee.svg'
import PassordUnSeeImg from '../assets/image/passwordunsee.svg'
import rickAuth from '../assets/image/rickAuth.svg'
import rickAuthTop from '../assets/image/rickAuthTop.svg'
import mortyAuth from '../assets/image/mortyAuth.svg'
import errorSVG from '../assets/image/errorsvg.svg'
import { useInput } from '../hook/input'
import { initData } from '../store/slices/userDataSlice'

interface ModalProps {
  registration: boolean
  setRegistration(active: boolean): void
}

const Registration = ({ registration, setRegistration }: ModalProps) => {
  const dispatch = useAppDispatch()
  const [passwordSee, setPasswordSee] = useState(false)
  const [passwordRepeatSee, setPasswordRepeatSee] = useState(false)
  const { registrationUsers } = useAppSelector((state) => state.registration)

  const email = useInput('', {
    isEmpty: true,
    minLength: 6,
    maxLength: 50,
    isEmail: true,
  })

  const login = useInput('', {
    isEmpty: true,
    minLength: 6,
    maxLength: 20,
  })
  const firstName = useInput('', {
    isEmpty: true,
    minLength: 2,
    maxLength: 50,
  })
  const secondName = useInput('', {
    isEmpty: true,
    minLength: 2,
    maxLength: 50,
  })
  const password = useInput('', {
    isEmpty: true,
    minLength: 6,
    maxLength: 50,
    isPassword: true,
  })
  const repeatPassword = useInput('', {
    isEmpty: true,
    minLength: 6,
    maxLength: 50,
    isPassword: true,
  })

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    dispatch(
      registrationUser({
        email: email.value,
        login: login.value,
        firstName: firstName.value,
        secondName: secondName.value,
        password: password.value,
        repeatPassword: repeatPassword.value,
      })
    )
    dispatch(initData(registrationUsers.length))
    setRegistration(false)

    email.removeValue()
    login.removeValue()
    firstName.removeValue()
    secondName.removeValue()
    password.removeValue()
    repeatPassword.removeValue()
  }

  return (
    <div
      className={registration ? 'modal active' : 'modal'}
      onClick={() => {
        setRegistration(false)
      }}
    >
      <div
        className={registration ? 'modal__content active' : 'modal__content'}
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
        <div className='flex flex-col gap-y-[48px] py-9 px-5 items-center bg-white rounded-md'>
          <h2 className='text-5xl'>Регистрация</h2>
          <form
            className='flex flex-col items-start gap-y-[35px]'
            onSubmit={submitHandler}
          >
            <div className='input_container'>
              <input
                type='text'
                value={email.value}
                onChange={(e) => email.onChange(e)}
                onBlur={(e) => email.onBlur(e)}
                placeholder='Введите E-mail'
                className={
                  email.isDirty && !email.inputValid
                    ? 'auth__input auth__text p-[10px] min-w-[331px]  invalid'
                    : 'auth__input auth__text p-[10px] min-w-[331px]'
                }
              />
              {email.isDirty && !email.inputValid && (
                <div className='error_input flex gap-2 px-3 py-0.5'>
                  <img src={errorSVG} alt='error' />
                  {email.logError}
                </div>
              )}
            </div>
            <div className='input_container'>
              <input
                type='text'
                value={login.value}
                onChange={(e) => login.onChange(e)}
                onBlur={(e) => login.onBlur(e)}
                placeholder='Придумайте логин'
                className={
                  login.isDirty && !login.inputValid
                    ? 'auth__input auth__text p-[10px] min-w-[331px]  invalid'
                    : 'auth__input auth__text p-[10px] min-w-[331px]'
                }
              />
              {login.isDirty && !login.inputValid && (
                <div className='error_input flex gap-2 px-3 py-0.5'>
                  <img src={errorSVG} alt='error' />
                  {login.logError}
                </div>
              )}
            </div>
            <div className='input_container'>
              <input
                type='text'
                value={firstName.value}
                onChange={(e) => firstName.onChange(e)}
                onBlur={(e) => firstName.onBlur(e)}
                placeholder='Введите имя'
                className={
                  firstName.isDirty && !firstName.inputValid
                    ? 'auth__input auth__text p-[10px] min-w-[331px]  invalid'
                    : 'auth__input auth__text p-[10px] min-w-[331px]'
                }
              />
              {firstName.isDirty && !firstName.inputValid && (
                <div className='error_input flex gap-2 px-3 py-0.5'>
                  <img src={errorSVG} alt='error' />
                  {firstName.logError}
                </div>
              )}
            </div>
            <div className='input_container'>
              <input
                type='text'
                value={secondName.value}
                onChange={(e) => secondName.onChange(e)}
                onBlur={(e) => secondName.onBlur(e)}
                placeholder='Введите фамилию'
                className={
                  secondName.isDirty && !secondName.inputValid
                    ? 'auth__input auth__text p-[10px] min-w-[331px]  invalid'
                    : 'auth__input auth__text p-[10px] min-w-[331px]'
                }
              />
              {secondName.isDirty && !secondName.inputValid && (
                <div className='error_input flex gap-2 px-3 py-0.5'>
                  <img src={errorSVG} alt='error' />
                  {secondName.logError}
                </div>
              )}
            </div>
            <div className='relative input_container'>
              <input
                type={!passwordSee ? 'text' : 'password'}
                value={password.value}
                onChange={(e) => password.onChange(e)}
                onBlur={(e) => password.onBlur(e)}
                placeholder='Введите  пароль'
                className={
                  password.isDirty && !password.inputValid
                    ? 'auth__input auth__text p-[10px] min-w-[331px]  invalid'
                    : 'auth__input auth__text p-[10px] min-w-[331px]'
                }
              />
              <img
                src={!passwordSee ? PassordSeeImg : PassordUnSeeImg}
                alt='watch_passord'
                className='absolute right-[15px] top-[8px] content-none'
                onClick={() => {
                  passwordSee ? setPasswordSee(false) : setPasswordSee(true)
                }}
              />
              {password.isDirty && !password.inputValid && (
                <div className='error_input flex gap-2 px-3 py-0.5'>
                  <img src={errorSVG} alt='error' />
                  {password.logError}
                </div>
              )}
            </div>
            <div className='relative input_container mb-5'>
              <input
                type={!passwordRepeatSee ? 'text' : 'password'}
                value={repeatPassword.value}
                onChange={(e) => repeatPassword.onChange(e)}
                onBlur={(e) => repeatPassword.onBlur(e)}
                placeholder='Повторите  пароль'
                className={
                  repeatPassword.isDirty && !repeatPassword.inputValid
                    ? 'auth__input auth__text p-[10px] min-w-[331px] invalid'
                    : 'auth__input auth__text p-[10px] min-w-[331px]'
                }
              />
              <img
                src={!passwordRepeatSee ? PassordSeeImg : PassordUnSeeImg}
                alt='watch_password'
                className='absolute right-[15px] top-[8px] content-none'
                onClick={() => {
                  passwordRepeatSee
                    ? setPasswordRepeatSee(false)
                    : setPasswordRepeatSee(true)
                }}
              />
              {repeatPassword.isDirty && !repeatPassword.inputValid && (
                <div className='error_input flex gap-2 px-3 py-0.5'>
                  <img src={errorSVG} alt='error' />
                  {repeatPassword.logError}
                </div>
              )}
              {!(password.value === repeatPassword.value) && (
                <div className='error_input flex gap-2 px-3 py-0.5'>
                  <img src={errorSVG} alt='error' />
                  passwords do not match!
                </div>
              )}
            </div>
            <button
              disabled={
                !email.inputValid ||
                !login.inputValid ||
                !firstName.inputValid ||
                !secondName.inputValid ||
                !password.inputValid ||
                !repeatPassword.inputValid ||
                !(password.value === repeatPassword.value)
              }
              className='auth__button max-w-[100%] mx-auto '
            >
              Зарегистрировать
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registration
