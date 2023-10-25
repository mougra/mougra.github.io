import React, { useEffect, useRef, useState } from 'react'
import CharacterFilter from '../components/CharacterFilter'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { fetchCharacters } from './../store/actions/characterActions'
import CharactersCard from '../components/CharactersCard'
import ReactPaginate from 'react-paginate'
import { Link, useNavigate } from 'react-router-dom'
import { useDebounce } from '../hook/debounce'
import { useInput } from '../hook/input'

function CharactersPage() {
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { error, loading, characters, charactersInfo } = useAppSelector(
    (state) => state.character
  )
  const page = useRef(1)

  const nameInput = useInput('', {})
  const raceInput = useInput('', {})
  const [selectedInput, setSelected] = useState('')
  const debouncedName = useDebounce<string>(nameInput.value)
  const debouncedRace = useDebounce<string>(raceInput.value)

  useEffect(() => {
    dispatch(
      fetchCharacters(page.current, debouncedName, debouncedRace, selectedInput)
    )
  }, [dispatch, page, debouncedName, debouncedRace, selectedInput])

  const handlePageClick = ({ selected }: { selected: number }) => {
    page.current = selected + 1
    dispatch(
      fetchCharacters(page.current, debouncedName, debouncedRace, selectedInput)
    )
  }

  const [displayCard, setDisplayCard] = useState(true)

  return (
    <main className='container mx-auto'>
      <div className='container mx-auto px-[15px] max-w-[1200px]'>
        <div className='flex flex-wrap'>
          <Link to='/main'>
            <div
              className='flex gap-5 items-center'
              onClick={() => navigate(-1)}
            >
              <div className='back__arrow'></div>
              <div className='font-normal text-lg'>Назад</div>
            </div>
          </Link>
          <h2 className='text-2xl pb-[35px] mx-auto font-bold pr-[70px]'>
            Персонажи
          </h2>
        </div>
        <CharacterFilter
          displayCard={displayCard}
          setDisplayCard={setDisplayCard}
          nameInput={nameInput}
          raceInput={raceInput}
          selected={selectedInput}
          setSelected={setSelected}
          debouncedName={debouncedName}
          debouncedRace={debouncedRace}
        />
        {loading && <p className='text-center text-lg'>Loading...</p>}
        {error && (
          <p className='text-center text-lg text-red-600'>
            Усп. Кажется такого персонажа не сущесвтует. Только без паники!
          </p>
        )}

        {!error && !loading && (
          <div
            className={
              displayCard ? 'flex flex-wrap justify-between' : 'w-[100%]'
            }
          >
            {characters.map((character) => (
              <CharactersCard
                key={character.id}
                character={character}
                displayCard={displayCard}
                isFavorite={false}
              />
            ))}
          </div>
        )}
        {!error && !loading && charactersInfo.pages && (
          <ReactPaginate
            breakLabel='...'
            nextLabel={
              <div className='flex gap-2.5 items-center paginate__container'>
                <div className='paginate__text text-xs'>Следующая</div>
                <div className='right-arrow'></div>
              </div>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={charactersInfo.pages}
            previousLabel={
              <div className='flex gap-2.5 items-center paginate__container'>
                <div className='left-arrow'></div>
                <div className='paginate__text text-xs'>Предыдущая</div>
              </div>
            }
            forcePage={page.current - 1}
            containerClassName='flex gap-5 justify-center items-center pt-[35px] pb-[68px] px-[50px]'
            pageClassName='paginate__li '
            previousClassName='pr-[50px]'
            nextClassName='pl-[50px]'
            activeClassName='paginate__active-li text-[#FF0000]'
          />
        )}
      </div>
    </main>
  )
}

export default CharactersPage
