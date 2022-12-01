import React, { useState } from 'react'
import { ILocation } from '../models/models'
import imgAddFavorites from '../assets/image/add-to-favorites.svg'
import imgAddFavoritesHover from '../assets/image/add-to-favorites (hover).svg'
import imgAddFavoritesComplited from '../assets/image/add-to-favorites (complited).svg'
import imgRemoveFavorites from '../assets/image/del-to-favorites.svg'
import imgRemoveFavoritesHover from '../assets/image/del-to-favorites (hover).svg'
import cardAddFavoritesDisplayLine from '../assets/image/cardAddFavoritesDisplayLine.svg'
import cardInFavoritesDisplayLine from '../assets/image/cardInFavoritesDisplayLine.svg'
import cardInFavoritesDisplayLineHOVER from '../assets/image/cardInFavoritesDisplayLineHOVER.svg'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import {
  addLocationData,
  removeLocationData,
} from '../store/slices/userDataSlice'
interface CharacterCardProps {
  location: ILocation
  displayCard: boolean
  isFavorite: boolean
}

function LocationsCard({
  location,
  displayCard = true,
  isFavorite,
}: CharacterCardProps) {
  const dispatch = useAppDispatch()
  const [addFavorite, setAddFavorite] = useState(0)
  const { isAuth, userId } = useAppSelector((state) => state.auth)
  const { usersData } = useAppSelector((state) => state.data)

  let isFavoriteCard = false
  if (usersData.length === 0) {
  } else {
    isFavoriteCard = usersData[userId].locationsData.includes(location.id)
  }

  const handleMouseEnter = (e: React.SyntheticEvent<EventTarget>) => {
    // console.log('фокус на родительском элементе установлен', e.currentTarget)
    setAddFavorite(1)
  }

  const handleMouseLeave = () => {
    // console.log('фокус на родительском элементе снят')
    setAddFavorite(0)
  }

  function setHandler(e: any) {
    if (isFavorite) {
      const index = usersData[userId].locationsData.indexOf(location.id)
      if (index !== -1) {
        dispatch(
          removeLocationData({
            locationsData: index,
            usersId: userId,
          })
        )
      }
    } else {
      displayCard
        ? (e.target.src = imgAddFavoritesComplited)
        : (e.target.src = cardInFavoritesDisplayLine)
      if (isFavoriteCard) return
      dispatch(
        addLocationData({
          locationsData: location.id,
          usersId: userId,
        })
      )
    }
  }

  function changeBackgroundHover(e: any) {
    if (!isFavoriteCard) {
      displayCard
        ? (e.target.src = imgAddFavoritesHover)
        : (e.target.src = cardInFavoritesDisplayLineHOVER)
    }
    if (isFavorite) e.target.src = imgRemoveFavoritesHover
    return true
  }

  function changeBackground(e: any) {
    if (!isFavoriteCard) {
      displayCard
        ? (e.target.src = imgAddFavorites)
        : (e.target.src = cardAddFavoritesDisplayLine)
    }
    if (isFavorite) e.target.src = imgRemoveFavorites
  }

  return (
    <div
      className='character_card flex min-w-[570px] mb-[35px] h-[164px] justify-center transition duration-200 ease-in-out'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='flex flex-col px-[30px] py-[11px] w-full'>
        <span className='font-bold text-4xl mb-[9px] text-center max-w-[510px] truncate'>
          {location.name}
        </span>
        <div
          className={
            displayCard
              ? 'flex flex-wrap justify-between'
              : 'flex flex-wrap justify-around'
          }
        >
          <ul className='font-medium text-xs flex flex-col gap-y-[5px] max-w-[120px]'>
            <li className='text-[#1F4766]'>Тип:</li>
            <li>{location.type}</li>
            <li className='text-[#1F4766]'>Измерение:</li>
            <li>{location.dimension}</li>
          </ul>
          <ul className='font-medium text-xs flex flex-col gap-y-[5px] max-w-[283px]'>
            <li className='text-[#1F4766]'>
              Количество персонажей, которые в последний раз были замечены
              здесь:
            </li>
            <li className='text-4xl'>{location.residents.length}</li>
          </ul>
        </div>
      </div>

      {isAuth && addFavorite === 1 && displayCard && (
        <img
          src={
            isFavorite
              ? imgRemoveFavorites
              : isFavoriteCard
              ? imgAddFavoritesComplited
              : imgAddFavorites
          }
          alt='imgAddFavorites'
          className={
            addFavorite === 1
              ? 'absolute content-none top-[-1.25rem] right-[-1.25rem] cursor-pointer transition duration-200 ease-in-out'
              : 'hidden transition duration-200 ease-in-out'
          }
          onClick={setHandler}
          onMouseOver={changeBackgroundHover}
          onMouseLeave={changeBackground}
        />
      )}

      {isAuth && addFavorite === 1 && !displayCard && (
        <img
          src={
            isFavorite
              ? imgRemoveFavorites
              : isFavoriteCard
              ? cardInFavoritesDisplayLine
              : cardAddFavoritesDisplayLine
          }
          alt='imgAddFavorites'
          className={
            addFavorite === 1
              ? 'absolute content-none bottom-[1.25rem] right-[1.25rem] cursor-pointer transition duration-200 ease-in-out'
              : 'absolute content-none hidden transition duration-200 ease-in-out'
          }
          onClick={setHandler}
          onMouseOver={changeBackgroundHover}
          onMouseLeave={changeBackground}
        />
      )}
    </div>
  )
}

export default LocationsCard
