'use client'
import Image from 'next/image'
import Link from 'next/link'
import TopMenu from '@/components/shared/TopMenu'
import useUser from '@/data/hooks/useUser'

export default function TitleSlogan() {
  const { user } = useUser()
  return (
    <div className="py-10 relative h-[700px]">
      <Image src="/banners/main.webp" fill alt="Barbershop" className="object-cover" />
      <div
        className="
                    flex flex-col items-center
                    absolute top-0 left-0 w-full h-full
                    bg-black/80 md:bg-transparent md:bg-gradient-to-r from-black/30 via-black/90 to-black/30
                "
      >
        <TopMenu />
        <div className="container flex-1 flex flex-col justify-center items-center gap-5">
          <h1 className="flex flex-col items-center">
            <span className="text-gradient text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black pb-2 uppercase">
              Legendary
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin tracking-wider uppercase">
              Transformations
            </span>
          </h1>
          <p className="w-96 text-center text-zinc-400 text-base sm:text-lg font-extralight">
            🤘 Your style is our Rock 🤘
          </p>
          {!user?.isBarber && (
            <Link
              href="/scheduling"
              className="
                            bg-gradient-to-r from-green-500 to-green-600
                            text-white font-semibold text-base md:text-lg
                            py-2 px-4 rounded-md hover:from-green-600 hover:to-green-700
                        "
            >
              Schedule Now
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
