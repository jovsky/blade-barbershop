import axios from 'axios'
import { useCallback } from 'react'
import useUser from './useUser'

const URL_BASE = process.env.NEXT_PUBLIC_API_URL


export default function useAPI() {
  const { token } = useUser()
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }

  const adjustURI = (uri: string) =>  uri.startsWith('/') ? uri.slice(1) : uri

  const httpGet = useCallback(async function <T>(uri: string): Promise<T | undefined> {
    try {
      const { data } = await axios.get(`${URL_BASE}/${adjustURI(uri)}`, )
      return data
    } catch (error) {
      console.error(error)
    }
  }, [])

  const httpPost = useCallback(async function <T>(uri: string, body: any): Promise<T | undefined> {
    const { data } = await axios.post(`${URL_BASE}/${adjustURI(uri)}`, body, config)
    return data
  }, [])

  /* For any late implementation */
  const httpDelete = useCallback(async function <T>(uri: string): Promise<T | undefined> {
    const { data } = await axios.delete(`${URL_BASE}/${adjustURI(uri)}`, )
    return data
  }, [])

  return { httpGet, httpPost, httpDelete }
}
