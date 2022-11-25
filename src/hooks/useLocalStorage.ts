import { useState, useEffect } from "react"


export const useSessionStorage = <T>(key: string, InitialValue: T | (() => T)) => {
  return useStorage(key, InitialValue, 'sessionStorage')
}
export const useLocalStorage = <T>(key: string, InitialValue: T | (() => T)) => {
  return useStorage(key, InitialValue, 'localStorage')
}
const useStorage = <T>(key: string, InitialValue: T | (() => T), storageType: 'localStorage' | 'sessionStorage') => {
  const [values, setValues] = useState<T>(() => {
    const storageValue = window[storageType].getItem(key)
    if (storageValue !== null) return JSON.parse(storageValue)
    if (typeof InitialValue === 'function') {
      return (InitialValue as () => T)()
    } else {
      return InitialValue
    }
  })
  useEffect(() => {
    if (values === undefined) return window[storageType].removeItem(key)
    window[storageType].setItem(key, JSON.stringify(values))
  }, [key, InitialValue])

  return [values, setValues] as [T, React.Dispatch<React.SetStateAction<T>>]

}