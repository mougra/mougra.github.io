import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/image/logo.svg'

import Registration from './Registration'
import Login from './Login'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { logoutUser } from '../store/slices/authSlice'
import { fetchCharactersFavorite } from '../store/actions/characterActions'

function Navigation() {
  const dispatch = useAppDispatch()
  let navigate = useNavigate()

  const { registrationUsers } = useAppSelector((state) => state.registration)
  const { isAuth, userId } = useAppSelector((state) => state.auth)
  const [registrationActive, setRegistrationActive] = useState(false)
  const [loginActive, setloginActive] = useState(false)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(logoutUser())
    navigate('/')
  }

  return (
    <>
      <Registration
        registration={registrationActive}
        setRegistration={setRegistrationActive}
      ></Registration>
      <Login login={loginActive} setLogin={setloginActive}></Login>
      <nav className=' mx-auto px-[15px] p-[38px] max-w-[1200px] flex justify-between min-h-[74px] items-center font-bold'>
        <div className='flex flex-wrap items-center gap-[93px]'>
          <Link to='#'>
            <img src={logo} alt='logo' />
          </Link>
          <div className='flex gap-7 items-center flex-wrap'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive
                  ? 'text-[#ff0000] border-b-[1px] border-[#ff0000] transition duration-200 ease-in-out font-bold'
                  : 'hover:text-[#ff0000] transition duration-200 ease-in-out font-medium'
              }
            >
              Главная
            </NavLink>
            {isAuth && (
              <NavLink
                to='/favorites'
                className={({ isActive }) =>
                  isActive
                    ? 'text-[#ff0000] border-b-[1px] border-[#ff0000] transition duration-200 ease-in-out font-bold'
                    : 'hover:text-[#ff0000] transition duration-200 ease-in-out font-medium'
                }
              >
                Избранное
              </NavLink>
            )}
            <NavLink
              to='/aboutus'
              className={({ isActive }) =>
                isActive
                  ? 'text-[#ff0000] border-b-[1px] border-[#ff0000] transition duration-200 ease-in-out font-bold'
                  : 'hover:text-[#ff0000] transition duration-200 ease-in-out font-medium'
              }
            >
              О проекте
            </NavLink>
          </div>
        </div>
        <div className='flex flex-wrap gap-6 items-center'>
          {isAuth && (
            <>
              <span>{`${
                registrationUsers[userId].firstName
              } ${registrationUsers[userId].secondName
                .toUpperCase()
                .slice(0, 1)}.`}</span>
              <button
                onClick={submitHandler}
                className='white_btn transition duration-200 ease-in-out'
              >
                Выйти
              </button>
            </>
          )}
          {!isAuth && (
            <>
              <button
                onClick={() => setRegistrationActive(true)}
                className='white_btn transition duration-200 ease-in-out'
              >
                Регистрация
              </button>
              <button
                onClick={() => setloginActive(true)}
                className='auth__button transition duration-200 ease-in-out'
              >
                Войти
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navigation
