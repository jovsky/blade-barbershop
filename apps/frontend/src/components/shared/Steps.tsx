import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import React, { PropsWithChildren, useState } from "react"

export interface PassosProps {
  labels: string[]
  nextStepAllowed: boolean
  allowNextStep(value: boolean): void
}

interface Step {
  label: string
  stepIndex: number
}

export default function Steps(props: PropsWithChildren<PassosProps>) {
  const [currentStep, setCurrentStep] = useState(0)

  function goToPreviousStep() {
    setCurrentStep(currentStep - 1)
    props.allowNextStep(true)
  }

  function goToNextStep() {
    setCurrentStep(currentStep + 1)
    props.allowNextStep(false)
  }

  const StepItem: React.FC<Step> = ({ label, stepIndex }) => {
    return (
      <div className="flex items-center gap-2">
        <span
          className={`
                        flex justify-center items-center w-9 h-9 p-1 rounded-full font-bold
                        ${stepIndex === currentStep ? "bg-white text-black" : "text-zinc-500 bg-zinc-700"} 
                    `}
        >
          {stepIndex + 1}
        </span>
        <span
          className={stepIndex === currentStep ? "text-white" : "text-zinc-700"}
        >
          {label}
        </span>
      </div>
    )
  }

  const StepsProgress: React.FC = () => {
    return (
      <div className="flex flex-col md:flex-row gap-4 md:gap-7 border-red-600">
        {props.labels.map((label, i) => (
          <StepItem key={i} label={label} stepIndex={i} />
        ))}
      </div>
    )
  }

  const StepsContent = props.children as React.ReactNode[]

  const lastStepIndex = (StepsContent?.length ?? 0) - 1

  return (
    <div className="flex flex-col gap-10 items-center lg:items-stretch">
      <StepsProgress />
      <div>{StepsContent?.[currentStep] ?? StepsContent}</div>
      <div className="flex gap-3 select-none">
        <button
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
          className="flex gap-1 items-center bg-zinc-700 text-sm text-white px-4 py-1.5 rounded-md disabled:opacity-30"
        >
          <IconChevronLeft size={20} />
          <span>Previous</span>
        </button>
        <button
          onClick={goToNextStep}
          disabled={currentStep === lastStepIndex || !props.allowNextStep}
          className="flex gap-1 items-center bg-zinc-700 text-sm text-white px-4 py-1.5 rounded-md disabled:opacity-30"
        >
          <span>Next</span>
          <IconChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
