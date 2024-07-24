"use client"

import { PropsWithChildren } from "react"

import TitleSlogan from "@/components/landing/TitleSlogan"
import BackgroundContainer from "@/components/shared/BackgroundContainer"
import OurCostumers from "@/components/costumer/OurCostumers"
import OurProfessionals from "@/components/professional/OurProfessionals"
import OurServices from "@/components/service/OurServices"

export default function Landing(props: PropsWithChildren) {
  return (
    <div>
      <TitleSlogan />
      <BackgroundContainer imagem="/banners/services.webp">
        <OurServices />
      </BackgroundContainer>
      <BackgroundContainer imagem="/banners/professionals.webp">
        <OurProfessionals />
      </BackgroundContainer>
      <BackgroundContainer imagem="/banners/costumers.webp">
        <OurCostumers />
      </BackgroundContainer>
    </div>
  )
}
