// 'use client'
// import { createContext, useCallback, useEffect, useState } from 'react'
// import { jwtDecode } from 'jwt-decode'
// import cookie from 'js-cookie'
// import { User } from '@barbers-blade/core'

// interface SessionContextProps {
//     loading: boolean
//     token: string | null
//     user: User | null
//     createSession: (jwt: string) => void
//     cleanSession: () => void
// }

// const SessionContext = createContext<SessionContextProps>({} as any)

// export function SessionProvider(props: any) {
//     const cookieName = 'barbers-blade-authorization'

//     const [loading, setLoading] = useState(true)
//     const [token, setToken] = useState<string | null>(null)
//     const [user, setUser] = useState<User | null>(null)



//     useEffect(() => loadSession(), [loadSession])


//     return (
//         <SessionContext.Provider
//             value={{
//                 loading,
//                 token,
//                 user,
//                 createSession,
//             }}
//         >
//             {props.children}
//         </SessionContext.Provider>
//     )
// }

// export default SessionContext
