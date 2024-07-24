'use client'
import { useCallback } from 'react'

export default function useLocalStorage() {
    const get = useCallback(<T>(key: string) => {
        const localValue = window?.localStorage?.getItem(key)
        return localValue ? (JSON.parse(localValue) as T) : null
    }, [])

    const set = useCallback((key: string, value: any) => {
        window?.localStorage?.setItem(key, JSON.stringify(value))
    }, [])

    const remove = useCallback((key: string) => {
        window?.localStorage?.removeItem(key)
    }, [])

    return { get, set, remove }
}
