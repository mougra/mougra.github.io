import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import ReactPaginate from 'react-paginate'
import { Link, useNavigate } from 'react-router-dom'
import { useDebounce } from '../hook/debounce'
import { useInput } from '../hook/input'
import { fetchLocations } from '../store/actions/locationActions'
import LocationsCard from '../components/LocationsCard'
import LocationFilter from '../components/LocationFilter'

function LocationsPage() {
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { error, loadingLoc, locations, locationsInfo } = useAppSelector(
    (state) => state.location
  )
  const page = useRef(1)

  const nameLocationInput = useInput('', {})
  const typeLocationInput = useInput('', {})
  const dimensionLocationInput = useInput('', {})
  // const [selectedInput, setSelected] = useState('')
  const debouncednameLocation = useDebounce<string>(nameLocationInput.value)
  const debouncedtypeLocation = useDebounce<string>(typeLocationInput.value)
  const debounceddimensionLocation = useDebounce<string>(
    dimensionLocationInput.value
  )

  useEffect(() => {
    dispatch(
      fetchLocations(
        page.current,
        debouncednameLocation,
        debouncedtypeLocation,
        debounceddimensionLocation
      )
    )
  }, [
    dispatch,
    page,
    debouncednameLocation,
    debouncedtypeLocation,
    debounceddimensionLocation,
  ])

  const handlePageClick = ({ selected }: { selected: number }) => {
    page.current = selected + 1
    dispatch(
      fetchLocations(
        page.current,
        debouncednameLocation,
        debouncedtypeLocation,
        debounceddimensionLocation
      )
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
            Локации
          </h2>
        </div>
        <LocationFilter
          displayCard={displayCard}
          setDisplayCard={setDisplayCard}
          nameLocationInput={nameLocationInput}
          typeLocationInput={typeLocationInput}
          dimensionLocationInput={dimensionLocationInput}
          debouncednameLocation={debouncednameLocation}
          debouncedtypeLocation={debouncedtypeLocation}
          debounceddimensionLocation={debounceddimensionLocation}
        />
        {loadingLoc && <p className='text-center text-lg'>Loading...</p>}
        {error && (
          <p className='text-center text-lg text-red-600'>
            Усп. Кажется такой локации не сущесвтует. Только без паники!
          </p>
        )}

        {!error && !loadingLoc && (
          <div
            className={
              displayCard ? 'flex flex-wrap justify-between' : 'w-[100%]'
            }
          >
            {locations.map((location) => (
              <LocationsCard
                key={location.id}
                location={location}
                displayCard={displayCard}
                isFavorite={false}
              />
            ))}
          </div>
        )}
        {!error && !loadingLoc && locationsInfo.pages && (
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
            pageCount={locationsInfo.pages}
            previousLabel={
              <div className='flex gap-2.5 items-center paginate__container'>
                <div className='left-arrow'></div>
                <div className='paginate__text text-xs'>Предыдущая</div>
              </div>
            }
            forcePage={page.current - 1}
            containerClassName='flex gap-5 justify-center items-center pt-[35px] pb-[68px] px-[50px]'
            pageClassName='paginate__li px-3 py-1'
            previousClassName='pr-[50px]'
            nextClassName='pl-[50px]'
            activeClassName='paginate__active-li text-[#FF0000]'
          />
        )}
      </div>
    </main>
  )
}

export default LocationsPage
