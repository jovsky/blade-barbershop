import axios from "axios"
import { useCallback } from "react"

const URL_BASE = process.env.NEXT_PUBLIC_URL_BASE

const config = {
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': `Bearer ${jwt}`, <====
  },
}

export default function useAPI() {
  const httpGet = useCallback(async function (uri: string): Promise<any> {
    try {
      const { data } = await axios.get(`${URL_BASE}/${uri}`)
      return data
    } catch (error) {
      console.error(error)
    }
  }, [])

  const httpPost = useCallback(async function (
    uri: string,
    body: any,
  ): Promise<any> {
    try {
      const { data } = await axios.post(`${URL_BASE}/${uri}`, body, config)
      return data
    } catch (error) {
      console.error(error)
    }
  }, [])

  return { httpGet, httpPost }
}
