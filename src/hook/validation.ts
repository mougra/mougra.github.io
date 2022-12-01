import { useEffect, useState } from 'react'

export const useValidation = (value: any, validations: any) => {
  const [isEmpty, setEmpty] = useState(true)
  const [minLengthError, setMinLengthError] = useState(false)
  const [maxLengthError, setMaxLengthError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [logError, setLogError] = useState('required to fill out')
  const [inputValid, setInputValid] = useState(false)

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          if (value) {
            // setLogError('')
            setEmpty(false)
          } else {
            setLogError('required to fill out')
            setEmpty(true)
          }
          break
        case 'minLength':
          if (value.length < validations[validation]) {
            setLogError(`input is too short, min: ${validations[validation]}`)
            setMinLengthError(true)
            break
          } else {
            // setLogError('')
            setMinLengthError(false)
          }
          break
        case 'maxLength':
          if (value.length > validations[validation]) {
            setLogError(`input is too long, max: ${validations[validation]}`)
            setMaxLengthError(true)
            break
          } else {
            // setLogError('')
            setMaxLengthError(false)
          }
          break
        case 'isEmail':
          const regexpEmail = /^\S+@\S+\.\S+$/
          if (regexpEmail.test(value)) {
            // setLogError('')
            setEmailError(false)
            break
          } else {
            setLogError('input email invalid')
            setEmailError(true)
          }
          break
        case 'isPassword':
          // const regexpPassword = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g
          const regexpPassword = /([a-zA-Z0-9А-Яа-я])/g
          if (regexpPassword.test(value)) {
            // setLogError('')
            setPasswordError(false)
            break
          } else {
            setLogError('input password invalid')
            setPasswordError(true)
          }
          break
      }
    }
  }, [value])

  function inputValidFuncFalse() {
    setInputValid(false)
  }

  function inputValidFuncTrue() {
    setInputValid(true)
  }

  useEffect(() => {
    if (
      isEmpty ||
      maxLengthError ||
      minLengthError ||
      emailError ||
      passwordError
    ) {
      setTimeout(inputValidFuncFalse, 500)
    } else {
      setTimeout(inputValidFuncTrue, 500)
    }
  }, [isEmpty, maxLengthError, minLengthError, emailError, passwordError])

  return {
    isEmpty,
    minLengthError,
    logError,
    emailError,
    maxLengthError,
    inputValid,
    passwordError,
  }
}
