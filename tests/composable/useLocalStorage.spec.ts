import { describe, expect, test } from 'vitest'
import { useLocalStorage } from '../../src/composable/useLocalStorage'

describe('composable: useLocalStorage', () => {
  test('should store initial value for given storage `key` on load', () => {
    const initialValue = []
    const { value } = useLocalStorage('key', initialValue)
    expect(value.value).toStrictEqual(initialValue)
  })

  test('getItem should return value from storage', () => {
    localStorage.clear()
    const initialValue = ['1', '2', '3']
    const { getItem, setItem } = useLocalStorage('key', initialValue)
    const output = getItem()

    expect(output).toStrictEqual(initialValue)

    const newValue = initialValue.concat(['4', '5'])
    setItem(newValue)
    const newOutput = getItem()
    expect(newOutput).toStrictEqual(newValue)
  })

  test('setItem should store value in storage', () => {
    localStorage.clear()
    const initialValue = ['1', '2', '3']
    const storageKey = 'key'
    const { setItem } = useLocalStorage(storageKey, initialValue)

    const initialValueInStorage = JSON.parse(localStorage.getItem(storageKey))
    expect(initialValueInStorage).toStrictEqual(initialValue)

    const newValue = initialValue.concat(['4', '5'])
    setItem(newValue)

    const newValueInStorage = JSON.parse(localStorage.getItem(storageKey))
    expect(newValueInStorage).toStrictEqual(newValue)
  })

  test('resetItem should reset value in storage to initialValue', () => {
    localStorage.clear()
    const initialValue = []
    const storageKey = 'key'
    const { setItem, resetItem } = useLocalStorage(storageKey, initialValue)

    const currentValueInStorage = JSON.parse(localStorage.getItem(storageKey))
    expect(currentValueInStorage).toStrictEqual(initialValue)

    const newValueInStorage = ['1', '2', '3']
    setItem(newValueInStorage)
    expect(JSON.parse(localStorage.getItem(storageKey))).toStrictEqual(newValueInStorage)

    resetItem()
    expect(JSON.parse(localStorage.getItem(storageKey))).toStrictEqual(initialValue)
  })
})
