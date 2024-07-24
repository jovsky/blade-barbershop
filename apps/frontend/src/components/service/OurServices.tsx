"use client"
import { Service } from "@barba/core"
import { useRouter } from "next/navigation"
import ServiceItem from "./ServiceItem"
import Title from "../shared/Title"
import useServices from "@/data/hooks/useServices"

export default function OurServices() {
  const router = useRouter()
  console.log("go")
  const { services } = useServices()

  function startSchedule() {
    router.push("/schedule")
  }

  console.log("services", services)

  return (
    <div className="flex flex-col gap-16">
      <Title
        tag="Services"
        primary="From Classic to Rock"
        secondary="Sharp hair, lumberjack beard and biker hands, all to the sound of heavy rock!"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {([] || services).map((service: Service) => (
          <ServiceItem
            key={service.id}
            service={service}
            onClick={startSchedule}
          />
        ))}
      </div>
    </div>
  )
}
