'use client'
import { UserProvider } from '@/data/contexts/UserContext'

export default function Provedor({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>
}
