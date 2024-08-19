'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PhoneUtils } from '@barba/core'
import useUser from '@/data/hooks/useUser'
import Logo from '@/components/shared/Logo'
import Image from 'next/image'
import { useToast } from '../ui/toast/useToast'

type FieldErrors = {
  name?: string,
  email?: string,
  phone?: string,
}

export default function UserForm() {
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({});

  const { user, signIn, signUp } = useUser()
  const params = useSearchParams()
  const router = useRouter()

  const { successToast, errorToast } = useToast()

  useEffect(() => {
    setErrors({})
  }, [name, email, phone]);

  useEffect(() => {
    Object.keys(errors).forEach((key) => {
      errorToast(errors[key as keyof FieldErrors]!)
    })
  }, [errors])

  function validateSignUpField() {
    let errors: FieldErrors = {};

    if (!name) {
      errors.name = "Name is mandatory";
    }
    if (!email) {
      errors.email = "E-mail is mandatory";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid e-mail";
    }
    if (!phone) {
      errors.phone = "Phone is mandatory";
    } else if (!/^\d{10,11}$/.test(phone)) {
      errors.phone = "Phone must have 10 or 11 digits";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  useEffect(() => {
    if (user?.email) {
      const dest = params.get('destiny') as string
      router.push(dest || '/')
    }
  }, [user, router, params])

  async function submit() {

    if (mode === 'signIn') {
      try {
        await signIn({ email, password })
        cleanForm()
      } catch (err) {
        errorToast((err as any)?.response?.data?.message ?? '')
      }
      return
    }

    if (!validateSignUpField()) return

    try {
      await signUp({ name, email, password, phone })
      successToast('Successfully registered!')

    } catch (err) {
      errorToast((err as any)?.response?.data?.message ?? '')
    }
    
  }

  function cleanForm() {
    setName('')
    setEmail('')
    setPhone('')
    setPassword('')
    setMode('signIn')
  }

  return (
    <div className='flex justify-center items-center h-screen relative'>
      <Image
        src='/banners/main.webp'
        fill
        alt='Barbearia'
        className='object-cover'
      />
      <div
        className='
              flex flex-col justify-center items-center gap-10
              absolute top-0 left-0 w-full h-full
              bg-black/80 md:bg-transparent md:bg-gradient-to-r from-black/30 via-black/90 to-black/30
          '
      >
        <Logo />
        <div className='flex flex-col w-1/5 gap-5'>
          <div className='flex flex-col gap-4 rounded'>
            {mode === 'signUp' && (
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
                className='bg-zinc-900 px-4 py-2 rounded'
              />
            )}
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='E-mail'
              className='bg-zinc-900 px-4 py-2 rounded'
            />
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='bg-zinc-900 px-4 py-2 rounded'
            />
            {mode === 'signUp' && (
              <input
                type='tel'
                value={PhoneUtils.format(phone)}
                onChange={(s) =>
                  setPhone(PhoneUtils.unformat(s.target.value))
                }
                placeholder='Phone'
                className='bg-zinc-900 px-4 py-2 rounded'
              />
            )}
            <div className='flex gap-5'>
              <button onClick={submit} className='button bg-green-600 flex-1'>
                {mode === 'signIn' ? 'Sign In' : 'Sign Up'}
              </button>
              <button
                onClick={() => {
                  router.push('/')
                }}
                className='button flex-1'
              >
                Cancel
              </button>
            </div>
            <div className='flex gap-5 justify-center text-sm'>
              {mode === 'signIn' ? (
                <button
                  onClick={() => setMode('signUp')}
                  className='text-zinc-300 hover:text-white'
                >
                  Still don't have an account? Sign up!
                </button>
              ) : (
                <button
                  onClick={() => setMode('signIn')}
                  className='text-zinc-300 hover:text-white'
                >
                  Already have an account? Sign in!
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
