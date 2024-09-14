import { ref } from 'vue'

const value = ref()
export function useLocalStorage(key: string, initialValue: any) {
  const localStorage = window.localStorage
  const getItem = () => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  }

  const setItem = (newValue: any) => {
    localStorage.setItem(key, JSON.stringify(newValue))
    value.value = getItem()
  }

  const resetItem = () => {
    setItem(initialValue)
    value.value = getItem()
  }

  if (!localStorage.getItem(key)) {
    setItem(initialValue)
  }

  value.value = getItem()

  return {
    getItem,
    setItem,
    resetItem,
    value
  }
}
