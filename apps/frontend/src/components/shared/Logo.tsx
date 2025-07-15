import Image from 'next/image'
import Link from 'next/link'

type LogoProps = {
  size?: 'sm' | 'lg'
}

export default function Logo({ size = 'sm' }: LogoProps) {
  const height = size === 'lg' ? 360 : 120

  return (
    <Link href="/" className="flex items-center h-14">
      <Image src="/barbers-logo.png" alt="Logo" width={height} height={height} className="hidden sm:block" />
    </Link>
  )
}
