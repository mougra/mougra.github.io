import React, { useEffect, useState } from 'react'
import blockDisplayBlack from '../assets/image/burgerBlack.svg'
import blockDisplayRed from '../assets/image/burgerRed.svg'
import lineDisplayBlack from '../assets/image/winBlack.svg'
import lineDisplayRed from '../assets/image/winRed.svg'

interface ModalLocationProps {
  displayCard: boolean
  setDisplayCard(active: boolean): void
  nameLocationInput: any
  typeLocationInput: any
  dimensionLocationInput: any
  debouncednameLocation: any
  debouncedtypeLocation: any
  debounceddimensionLocation: any
}

function LocationFilter({
  displayCard,
  setDisplayCard,
  nameLocationInput,
  typeLocationInput,
  dimensionLocationInput,
  debouncednameLocation,
  debouncedtypeLocation,
  debounceddimensionLocation,
}: ModalLocationProps) {
  const [hasFilter, setHasFilter] = useState(false)

  // const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //   setSelected(event.target.value)
  // }

  const clearFilter = () => {
    nameLocationInput.removeValue()
    typeLocationInput.removeValue()
    dimensionLocationInput.removeValue()
  }

  const isFilterEnabled = () => {
    return (
      debouncednameLocation ||
      debouncedtypeLocation ||
      debounceddimensionLocation
    )
  }

  useEffect(() => {
    if (isFilterEnabled()) {
      setHasFilter(true)
    } else {
      setHasFilter(false)
    }
  }, [debouncednameLocation, debouncedtypeLocation, debounceddimensionLocation])

  return (
    <div className='flex flex-wrap justify-between items-end pb-9'>
      <div className='flex flex-wrap gap-[30px]'>
        <div>
          <p className='text-xs pb-5'>Поиск по названию</p>
          <input
            type='text'
            className='auth__input auth__text p-[10px] min-w-[370px]'
            placeholder='Введите название локации'
            value={nameLocationInput.value}
            onChange={(e) => nameLocationInput.onChange(e)}
            onBlur={(e) => nameLocationInput.onBlur(e)}
          />
        </div>
        <div>
          <p className='text-xs pb-5'>Поиск по типу</p>
          <input
            type='text'
            className='auth__input auth__text p-[10px] min-w-[270px]'
            placeholder='Введите тип локации'
            value={typeLocationInput.value}
            onChange={(e) => typeLocationInput.onChange(e)}
            onBlur={(e) => typeLocationInput.onBlur(e)}
          />
        </div>
        <div>
          <p className='text-xs pb-5'>Поиск по измерению</p>
          <input
            type='text'
            className='auth__input auth__text p-[10px] min-w-[270px]'
            placeholder='Введите измерение'
            value={dimensionLocationInput.value}
            onChange={(e) => dimensionLocationInput.onChange(e)}
            onBlur={(e) => dimensionLocationInput.onBlur(e)}
          />
        </div>
      </div>
      {hasFilter && (
        <button
          className='py-1 px-4 bg-red-600 text-white rounded h-10'
          onClick={clearFilter}
        >
          &times;
        </button>
      )}
      <div>
        <p className='text-xs pb-5'>Вид</p>
        <div className='flex gap-4'>
          <img
            src={displayCard ? blockDisplayBlack : blockDisplayRed}
            alt='Display card line'
            className={
              !displayCard
                ? 'display__card-dashed cursor-pointer pointer-events-none'
                : 'cursor-pointer'
            }
            onClick={() => {
              displayCard ? setDisplayCard(false) : setDisplayCard(true)
            }}
          />
          <img
            src={displayCard ? lineDisplayRed : lineDisplayBlack}
            alt='Display card block'
            className={
              displayCard
                ? 'display__card-dashed cursor-pointer pointer-events-none'
                : 'cursor-pointer'
            }
            onClick={() => {
              displayCard ? setDisplayCard(false) : setDisplayCard(true)
            }}
          />
        </div>
        <div className=''></div>
      </div>
    </div>
  )
}

export default LocationFilter
