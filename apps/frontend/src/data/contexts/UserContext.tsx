'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@barbers-blade/core'
import useAPI from '../hooks/useAPI'

import { jwtDecode, JwtPayload } from 'jwt-decode'
import cookie from 'js-cookie'

export interface UserContextProps {
  loading: boolean
  user: User | null
  signIn: (user: Partial<User>) => Promise<void>
  signUp: (user: User) => Promise<void>
  signOut: () => void
  token: string | null
}

const UserContext = createContext<UserContextProps>({} as UserContextProps)

const cookieName = 'barbers-blade-authorization'

export function UserProvider({ children }: React.PropsWithChildren) {
  const { httpPost } = useAPI()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  
  const loadSession = useCallback(() => {
    try {
      setLoading(true)
      const { token, user } = getState() || {}
      setToken(token ?? null)
      setUser(user ?? null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => loadSession(), [loadSession])

  async function signIn(user: Partial<User>) {
    const token = await httpPost<string | undefined>('/user/sign-in', user)

    cookie.set(cookieName, token || '', {
      expires: 1,
      sameSite: 'None',
      secure: true,
    })

    loadSession()
  }

  async function signUp(user: User) {
    await httpPost('/user/sign-up', user)
  }

  function signOut() {
    setToken(null)
    setUser(null)
    cookie.remove(cookieName)
    router.push('/')
  }

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        signIn,
        signUp,
        signOut,
        token
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

function getState(): { token: string; user: User } | null {
  const jwt = cookie.get(cookieName)
  if (!jwt) return null

  try {
      const decoded = jwtDecode<JwtPayload & User>(jwt)
      const expired = decoded.exp ? decoded.exp < Date.now() / 1000 : null

      if (expired) {
          cookie.remove(cookieName)
          return null
      }
      
      return {
          token: jwt,
          user: {
              id: decoded.id,
              name: decoded.name,
              email: decoded.email,
              isBarber: decoded.isBarber,
          },
      }
  } catch (error) {
      cookie.remove(cookieName)
      return null
  }
}

export default UserContext
