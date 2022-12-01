import { ChangeEvent, useState } from 'react'
import { useValidation } from './validation'

export const useInput = (initialValue = '', validations: any) => {
  const [value, setValue] = useState(initialValue)
  const [isDirty, setDirty] = useState(false)
  const valid = useValidation(value, validations)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const onBlur = (event: any) => {
    setDirty(true)
  }

  const removeValue = () => {
    setValue('')
  }

  return {
    value,
    onChange,
    onBlur,
    ...valid,
    isDirty,
    removeValue,
  }
}
