import React, { useState } from 'react'
import { ICharacter } from '../models/models'
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
  addCharacterData,
  removeCharacterData,
} from '../store/slices/userDataSlice'
interface CharacterCardProps {
  character: ICharacter
  displayCard: boolean
  isFavorite: boolean
}

function CharactersCard({
  character,
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
    isFavoriteCard = usersData[userId].charactersData.includes(character.id)
  }

  const isStatus = () => {
    if (character.status === 'Alive') {
      return 'Живой'
    } else if (character.status === 'Dead') {
      return 'Мертв'
    } else {
      return 'Неизвестно'
    }
  }

  function qwert() {
    if (character.episode.length === 0) {
      return 'unknown'
    }
    if (
      character.episode[0].slice(40) ===
      character.episode[character.episode.length - 1].slice(40)
    ) {
      return character.episode[0].slice(40)
    } else {
      const createLog =
        character.episode[0].slice(40) +
        ' - ' +
        character.episode[character.episode.length - 1].slice(40)
      return createLog
    }
  }
  const episodesRange = qwert()

  const handleMouseEnter = (e: React.SyntheticEvent<EventTarget>) => {
    setAddFavorite(1)
  }

  const handleMouseLeave = () => {
    setAddFavorite(0)
  }

  function setHandler(e: any) {
    if (isFavorite) {
      const index = usersData[userId].charactersData.indexOf(character.id)
      if (index !== -1) {
        dispatch(
          removeCharacterData({
            charactersData: index,
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
        addCharacterData({
          charactersData: character.id,
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
      className='character_card flex min-w-[570px] mb-[35px] transition duration-200 ease-in-out'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={character.image}
        alt='img'
        width={163}
        height={162}
        className='pr-[15px] rounded-tl-[4px] rounded-bl-[4px]'
      />
      <div className='w-full'>
        <div className='flex flex-wrap justify-between pr-[15px]'>
          <p className='font-bold pt-[14px] pb-[8px] text-xl max-w-[300px]'>
            {character.name}
          </p>
          <div className='flex gap-1.5 items-center text-sm'>
            <div
              className={
                isStatus() === 'Живой'
                  ? `w-[5px] h-[5px] bg-[#00CA51] rounded-full`
                  : isStatus() === 'Мертв'
                  ? `w-[5px] h-[5px] bg-[#DF0000] rounded-full`
                  : `w-[5px] h-[5px] bg-[#FFC803] rounded-full`
              }
            ></div>
            <div>{isStatus()}</div>
          </div>
        </div>

        <div className='flex flex-wrap'>
          <div className='min-w-[405px] flex gap-x-3.5'>
            <ul className='font-normal text-xs flex flex-col gap-y-2'>
              <li className='text-[#1F4766]'>Раса:</li>
              <li className='text-[#1F4766]'>Место происхождения:</li>
              <li className='text-[#1F4766]'>Последняя локация:</li>
            </ul>
            <ul className='text-sm flex flex-col gap-y-0.5'>
              <li>{character.species}</li>
              <li>{character.origin.name}</li>
              <li>{character.location.name}</li>
            </ul>
          </div>
          {!displayCard && (
            <>
              <div className=' flex flex-wrap gap-x-3.5'>
                <ul className='font-normal text-xs flex flex-col gap-y-2 leading-5'>
                  <li className='text-[#1F4766]'>Пол:</li>
                  <li className='text-[#1F4766]'>Эпизоды:</li>
                </ul>
                <ul className='text-sm flex flex-col gap-y-2'>
                  <li>{character.gender}</li>
                  <li>{episodesRange}</li>
                </ul>
              </div>
            </>
          )}
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
              ? 'absolute content-none top-[-1.25rem] right-[-1.25rem] cursor-pointer'
              : 'absolute content-none hidden'
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

export default CharactersCard
