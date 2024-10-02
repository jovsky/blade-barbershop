import { useState, useEffect } from 'react'
import useUser from './useUser'

const defaultErrors = {
  name: '',
  email: '',
  phone: '',
}

export default function useUserForm() {
  const { signIn } = useUser()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState(defaultErrors)

  useEffect(() => {
    setErrors(defaultErrors)
  }, [name, email, phone])

  function validate() {
    let errors: any = {}

    if (!name) {
      errors.name = 'Name is mandatory'
    }
    if (!email) {
      errors.email = 'E-mail is mandatory'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid e-mail'
    }
    if (!phone) {
      errors.phone = 'Phone is mandatory'
    } else if (!/^\d{10,11}$/.test(phone)) {
      errors.phone = 'Phone must have 10 or 11 digits'
    }

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function register() {
    if (validate()) {
      await signIn({ name, email, phone })
    }
  }

  return {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    errors,
    register,
  }
}
