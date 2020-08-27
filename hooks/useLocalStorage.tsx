// https://usehooks.com/useLocalStorage/

import { useState } from 'react'

const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const localStorageValue =
        typeof window !== 'undefined' ? localStorage.getItem(key) : initialValue
      return localStorageValue
        ? JSON.parse(localStorageValue)
        : initialValue instanceof Function
        ? initialValue()
        : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      typeof window !== 'undefined' &&
        localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
