import * as React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CharactersCard from '../components/CharactersCard'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { fetchCharactersFavorite } from '../store/actions/characterActions'
import Location from '../assets/image/Location.svg'
import Characters from '../assets/image/Characters.svg'
import Episodes from '../assets/image/Episodes.svg'
import { fetchLocationsFavorite } from '../store/actions/locationActions'
import LocationsCard from './../components/LocationsCard'
import { fetchEpisodesFavorite } from '../store/actions/episodeActions'
import EpisodeCard from './../components/EpisodeCard'

function FavoritesPage() {
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userId } = useAppSelector((state) => state.auth)
  const { usersData } = useAppSelector((state) => state.data)
  const { loading, favoritesCharacters } = useAppSelector(
    (state) => state.character
  )
  const { loadingLoc, favoritesLocations } = useAppSelector(
    (state) => state.location
  )
  const { loadingEpis, favoritesEpisodes } = useAppSelector(
    (state) => state.episode
  )

  const [isCard, setisCard] = useState(1)

  useEffect(() => {
    if (isCard === 1 && usersData[userId].charactersData.length > 0) {
      dispatch(fetchCharactersFavorite(usersData[userId].charactersData))
    } else if (isCard === 0 && usersData[userId].locationsData.length > 0) {
      dispatch(fetchLocationsFavorite(usersData[userId].locationsData))
    } else if (isCard === 2 && usersData[userId].episodesData.length > 0) {
      dispatch(fetchEpisodesFavorite(usersData[userId].episodesData))
    }
  }, [dispatch, usersData, isCard])

  return (
    <div className='container mx-auto px-[15px] max-w-[1200px]'>
      <div className='flex'>
        <Link to='/main'>
          <div className='flex gap-5 items-center' onClick={() => navigate(-1)}>
            <div className='back__arrow'></div>
            <div className='font-normal text-lg'>Назад</div>
          </div>
        </Link>
        <h2 className='text-2xl pb-[35px] mx-auto font-bold pr-[70px]'>
          Избранное
        </h2>
      </div>
      <div className='flex flew-wrap justify-between mb-[78px] cursor-pointer'>
        <img
          src={Location}
          alt='imgAddFavorites'
          className={
            isCard === 0
              ? 'w-[430px] transition duration-300 ease-in-out'
              : 'w-[270px]  hover:scale-[1.10] transition duration-300 ease-in-out'
          }
          onClick={() => setisCard(0)}
        />

        <img
          src={Characters}
          className={
            isCard === 1
              ? 'w-[430px] transition duration-300 ease-in-out'
              : 'w-[270px]  hover:scale-[1.10] transition duration-300 ease-in-out'
          }
          alt='imgAddFavorites'
          onClick={() => setisCard(1)}
        />

        <img
          src={Episodes}
          alt='imgAddFavorites'
          onClick={() => setisCard(2)}
          className={
            isCard === 2
              ? 'w-[430px] transition duration-300 ease-in-out'
              : 'w-[270px]  hover:scale-[1.10] transition duration-300 ease-in-out'
          }
        />
      </div>

      {!loading && isCard === 1 && (
        <div className='flex flex-wrap justify-between'>
          {usersData[userId].charactersData.length >= 1 &&
            Array.from(favoritesCharacters).map((character) => (
              <CharactersCard
                key={character.id}
                character={character}
                displayCard={true}
                isFavorite={true}
              />
            ))}
          {usersData[userId].charactersData.length == 1 &&
            !Array.isArray(favoritesCharacters) && (
              <CharactersCard
                character={favoritesCharacters}
                displayCard={true}
                isFavorite={true}
              />
            )}
          {usersData[userId].charactersData.length === 0 && (
            <p className='font-medium text-5xl mx-auto'>
              У вас пока нет избранных персонажей
            </p>
          )}
        </div>
      )}
      {!loadingLoc && isCard === 0 && (
        <div className='flex flex-wrap justify-between'>
          {usersData[userId].locationsData.length > 1 &&
            favoritesLocations.map((character) => (
              <LocationsCard
                key={character.id}
                location={character}
                displayCard={true}
                isFavorite={true}
              />
            ))}
          {usersData[userId].locationsData.length == 1 &&
            !Array.isArray(favoritesLocations) && (
              <LocationsCard
                location={favoritesLocations}
                displayCard={true}
                isFavorite={true}
              />
            )}
          {usersData[userId].locationsData.length === 0 && (
            <p className='font-medium text-5xl mx-auto'>
              У вас пока нет избранных локаций
            </p>
          )}
        </div>
      )}
      {!loadingEpis && isCard === 2 && (
        <div className='flex flex-wrap justify-between'>
          {usersData[userId].episodesData.length > 1 &&
            favoritesEpisodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                displayCard={true}
                isFavorite={true}
              />
            ))}
          {usersData[userId].episodesData.length == 1 &&
            !Array.isArray(favoritesEpisodes) && (
              <EpisodeCard
                episode={favoritesEpisodes}
                displayCard={true}
                isFavorite={true}
              />
            )}
          {usersData[userId].episodesData.length === 0 && (
            <p className='font-medium text-5xl mx-auto'>
              У вас пока нет избранных эпизодов
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage
