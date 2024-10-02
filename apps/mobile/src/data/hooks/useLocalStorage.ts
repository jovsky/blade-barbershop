'use client'
import { useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useLocalStorage() {
  const get = useCallback(async (key: string) => {
    const localVar = await AsyncStorage.getItem(key)
    return localVar ? JSON.parse(localVar) : null
  }, [])

  const set = useCallback(async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  }, [])

  return { get, set }
}
