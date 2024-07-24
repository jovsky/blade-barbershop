"use client"
import { Professional } from "@barba/core"
import ProfessionalItem from "@/components/professional/ProfessionalItem"
import Title from "@/components/shared/Title"
import useProfessionals from "@/data/hooks/useProfessionals"

export default function OurProfessionals() {
  const { professionals } = useProfessionals()

  return (
    <div className="container flex flex-col items-center gap-y-16">
      <Title
        tag="Team"
        primary="Our barbers"
        secondary="Only the bravest are here! We are proud to have the most qualified team in the world!"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 ">
        {professionals.map((professional: Professional) => (
          <ProfessionalItem key={professional.id} professional={professional} />
        ))}
      </div>
    </div>
  )
}
