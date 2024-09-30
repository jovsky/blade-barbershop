import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center h-14">
      <Image src="/barbers-logo.png" alt="Logo" width={120} height={120} className="hidden sm:block" />
    </Link>
  )
}
