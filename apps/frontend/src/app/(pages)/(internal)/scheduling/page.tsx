"use client"
import { useEffect, useState } from "react"
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
  const [currentStep, setCurrentStep] = useState(0)

  const {
    professional,
    services,
    dateTime,
    selectProfessional,
    selectServices,
    selectDateTime,
    numberSlots,
  } = useScheduling()

  useEffect(() => {
    if (currentStep === 0) {
      setNextStepAllowed(!!professional)
      return
    }
    if (currentStep === 1) {
      setNextStepAllowed(!!services.length)
      return
    }
    const hasDate = dateTime
    const validTime = dateTime.getHours() >= 8 && dateTime.getHours() <= 21
    setNextStepAllowed(hasDate && validTime)
  }, [services, professional, dateTime, currentStep])

  return (
    <div className="flex flex-col bg-zinc-900">
      <Header
        title="Service Scheduling"
        description="You will be attended punctually at the time"
      />
      <div
        className=" container flex flex-col lg:flex-row 
                    items-center lg:items-start lg:justify-around 
                    gap-10 lg:gap-0 py-10"
      >
        <Steps
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
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
            onProfessionalChange={selectProfessional}
          />
          <ServicesInput
            services={services}
            onServicesChange={selectServices}
          />
          <DateInput
            dateTime={dateTime}
            onDateChange={selectDateTime}
            numberSlots={numberSlots()}
          />
        </Steps>
        <Summary />
      </div>
    </div>
  )
}
