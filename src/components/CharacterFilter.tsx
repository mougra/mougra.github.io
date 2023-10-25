import React, { ChangeEvent, useEffect, useState } from 'react'
import blockDisplayBlack from '../assets/image/burgerBlack.svg'
import blockDisplayRed from '../assets/image/burgerRed.svg'
import lineDisplayBlack from '../assets/image/winBlack.svg'
import lineDisplayRed from '../assets/image/winRed.svg'

interface ModalProps {
  displayCard: boolean
  setDisplayCard(active: boolean): void
  nameInput: any
  raceInput: any
  selected: any
  setSelected(active: string): void
  debouncedName: any
  debouncedRace: any
}

function CharacterFilter({
  displayCard,
  setDisplayCard,
  nameInput,
  raceInput,
  selected,
  setSelected,
  debouncedName,
  debouncedRace,
}: ModalProps) {
  const [hasFilter, setHasFilter] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value)
  }

  const clearFilter = () => {
    setSelected('')
    nameInput.removeValue()
    raceInput.removeValue()
  }

  const isFilterEnabled = () => {
    return debouncedName || debouncedRace || selected
  }

  useEffect(() => {
    if (isFilterEnabled()) {
      setHasFilter(true)
    } else {
      setHasFilter(false)
    }
  }, [debouncedName, debouncedRace, selected])

  return (
    <div className='flex flex-wrap justify-between items-end pb-9'>
      <div className='flex flex-wrap gap-[30px]'>
        <div>
          <p className='text-xs pb-5'>Поиск по имени</p>
          <input
            type='text'
            className='auth__input auth__text p-[10px] min-w-[370px]'
            placeholder='Введите имя персонажа'
            value={nameInput.value}
            onChange={(e) => nameInput.onChange(e)}
            onBlur={(e) => nameInput.onBlur(e)}
          />
        </div>
        <div>
          <p className='text-xs pb-5'>Поиск по расе</p>
          <input
            type='text'
            className='auth__input auth__text p-[10px] min-w-[270px]'
            placeholder='Введите расу персонажа'
            value={raceInput.value}
            onChange={(e) => raceInput.onChange(e)}
            onBlur={(e) => raceInput.onBlur(e)}
          />
        </div>
        <div>
          <p className='text-xs pb-5'>Поиск по статусу</p>
          <select
            name='choice'
            className='auth__input auth__text p-[10px] pb-[8px] min-w-[270px]'
            value={selected}
            onChange={handleChange}
          >
            <option disabled={true} value=''>
              Выберете статус персонажа
            </option>
            <option className='select__opiniom-alive' value='Alive'>
              &#128994; Живой
            </option>
            <option value='Dead'>&#128308; Мертв</option>
            <option value='unknown'>&#128993; Неизвестно</option>
          </select>
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

export default CharacterFilter
