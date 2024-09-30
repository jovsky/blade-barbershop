'use client'
import useUser from '@/data/hooks/useUser'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default function Layout(props: PropsWithChildren) {
  const { user } = useUser()
  const router = useRouter()

  if (!user) {
    return null
  }

  if (!user?.isBarber) {
    return router.push('/')
  }

  return props.children
}
