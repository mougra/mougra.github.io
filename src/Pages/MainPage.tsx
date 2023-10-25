import React from 'react'
import { Link } from 'react-router-dom'
import imgCharacterCard1 from '../assets/image/imgCard1.jpg'
import imgCharacterCard2 from '../assets/image/imgCard2.jpg'
import imgCharacterCard3 from '../assets/image/imgCard3.jpg'

function MainPage() {
  return (
    <main className='container mx-auto'>
      <div className='container mx-auto px-[15px] max-w-[1200px] flex justify-between mb-[113px]'>
        <Link to='/characters'>
          <div className='w-[370px] px-[20px] pt-[20px] pb-[33px] main_card transition duration-200 ease-in-out'>
            <img
              src={imgCharacterCard1}
              alt='imgCharacter'
              className='pb-[18px]'
            />
            <h3 className='text-4xl pb-[18px]'>Персонажи</h3>
            <p className='text-base'>
              Зайди и познакомься со всеми персонажами вселенной
            </p>
          </div>
        </Link>
        <Link to='/locations'>
          <div className='w-[370px] px-[20px] pt-[20px] pb-[33px] main_card transition duration-200 ease-in-out'>
            <img
              src={imgCharacterCard2}
              alt='imgLocation'
              className='pb-[18px]'
            />
            <h3 className='text-4xl pb-[18px]'>Локации</h3>
            <p className='text-base'>
              Исследуй все локации. Давай же, не будь занудой!
            </p>
          </div>
        </Link>
        <Link to='/episodes'>
          <div className='w-[370px] px-[20px] pt-[20px] pb-[33px] main_card transition duration-200 ease-in-out'>
            <img
              src={imgCharacterCard3}
              alt='imgEpisodes'
              className='pb-[18px]'
            />
            <h3 className='text-4xl pb-[18px]'>Эпизоды</h3>
            <p className='text-base'>
              Узнай чуть больше о карте приключений Рика и Морти
            </p>
          </div>
        </Link>
      </div>
    </main>
  )
}

export default MainPage
