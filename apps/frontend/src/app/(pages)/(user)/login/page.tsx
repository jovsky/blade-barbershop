'use client'
import UserForm from '@/components/user/UserForm'
import { Suspense } from 'react'

export default function signIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserForm />
    </Suspense>
  )
}
