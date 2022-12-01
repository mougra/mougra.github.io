import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AboutUs() {
  let navigate = useNavigate()
  return (
    <div className='container mx-auto px-[15px] max-w-[1200px]'>
      <div className='flex'>
        <Link to='/main'>
          <div className='flex gap-5 items-center' onClick={() => navigate(-1)}>
            <div className='back__arrow'></div>
            <div className='font-normal text-lg'>Назад</div>
          </div>
        </Link>
        <h2 className='text-2xl pb-[70px] mx-auto font-bold pr-[70px]'>
          О проекте
        </h2>
      </div>
      <p className='font-normal text-2xl text-center mx-auto max-w-[990px]'>
        Данный проект создан по мотивам приключений Рика и Морти. Здесь вы
        можете поближе познакомиться со всеми персонажами, эпизодами и локациями
        данного мультсериала.
      </p>
    </div>
  )
}

export default AboutUs
