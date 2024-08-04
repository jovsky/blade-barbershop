import Image from 'next/image'
import MenuSuperior from '@/components/shared/TopMenu'

export interface HeaderProps {
  title: string
  description: string
}

export default function Header(props: HeaderProps) {
  return (
    <div className="py-10 relative h-[180px]">
      <Image src="/banners/main.webp" fill alt="Barbearia" priority className="object-cover" />
      <div
        className="
                    flex flex-col items-center
                    absolute top-0 left-0 w-full h-full
                    bg-black/80 md:bg-transparent md:bg-gradient-to-r from-black/30 via-black/90 to-black/30
                "
      >
        <MenuSuperior />
        <div className="container flex-1 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-black text-white/70">{props.title}</h1>
          <p className="text-sm font-light text-white/60">{props.description}</p>
        </div>
      </div>
    </div>
  )
}
