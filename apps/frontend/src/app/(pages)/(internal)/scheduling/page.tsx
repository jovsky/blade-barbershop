"use client"
import { useState } from "react"
import { Professional, Service } from "@barba/core"
import useScheduling from "@/data/hooks/useScheduling"
import Summary from "@/components/scheduling/Summary"
import ServicesInput from "@/components/scheduling/ServicesInput"
import ProfessionalInput from "@/components/scheduling/ProfessionalInput"
import Steps from "@/components/shared/Steps"
import DateInput from "@/components/scheduling/DateInput"
import Header from "@/components/shared/Header"

export default function SchedulingPage() {
  const [nextStepAllowed, setNextStepAllowed] = useState<boolean>(false)
  const {
    professional,
    services,
    dateTime,
    selectProfessional,
    selectServices,
    selectDateTime,
    numberSlots,
  } = useScheduling()

  function onProfessionalChange(professional: Professional) {
    selectProfessional(professional)
    setNextStepAllowed(!!professional)
  }

  function onServicesChange(services: Service[]) {
    selectServices(services)
    setNextStepAllowed(services.length > 0)
  }

  function onDateChange(dateTime: Date) {
    selectDateTime(dateTime)

    const hasDate = dateTime
    const validTime = dateTime.getHours() >= 8 && dateTime.getHours() <= 21
    setNextStepAllowed(hasDate && validTime)
  }

  return (
    <div className="flex flex-col bg-zinc-900">
      <Header
        title="Service Scheduling"
        description="Be seen exactly at the scheduled time."
      />
      <div
        className="
                    container flex flex-col lg:flex-row 
                    items-center lg:items-start lg:justify-around 
                    gap-10 lg:gap-0 py-10
                "
      >
        <Steps
          nextStepAllowed={nextStepAllowed}
          allowNextStep={setNextStepAllowed}
          labels={[
            "Select the barber",
            "Desired services",
            "Choose date and time",
          ]}
        >
          <ProfessionalInput
            professional={professional}
            onProfessionalChange={onProfessionalChange}
          />
          <ServicesInput
            services={services}
            onServicesChange={onServicesChange}
          />
          <DateInput
            dateTime={dateTime}
            onDateChange={onDateChange}
            numberSlots={numberSlots()}
          />
        </Steps>
        <Summary />
      </div>
    </div>
  )
}
