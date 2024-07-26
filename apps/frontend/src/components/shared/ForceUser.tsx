"use client"
import { usePathname, useRouter } from "next/navigation"
import useUser from "@/data/hooks/useUser"

export default function ForceUser(props: any) {
  const { loading, user } = useUser()
  const path = usePathname()
  const router = useRouter()

  function redirectTo(url: string, message: string) {
    router.push(url)
    return (
      <div className="flex justify-center items-center h-screen">{message}</div>
    )
  }

  if (!user?.email && loading) return <div>Loading...</div>

  if (!user?.email) return redirectTo(`/login?destiny=${path}`, "See you soon!")

  return props.children
}
