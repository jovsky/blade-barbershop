import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import React, { PropsWithChildren, useState } from "react"

export interface StepsProps {
  labels: string[]
  currentStep: number
  setCurrentStep(value: number): void
  nextStepAllowed: boolean
  allowNextStep(value: boolean): void
}

interface StepsProgressProps {
  labels: string[]
  currentStep: number
}

interface StepItemProps {
  label: string
  stepIndex: number
  currentStep: number
}

const StepItem: React.FC<StepItemProps> = ({
  label,
  stepIndex,
  currentStep,
}) => {
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

const StepsProgress: React.FC<StepsProgressProps> = ({
  labels,
  currentStep,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-7">
      {labels.map((label, i) => (
        <StepItem
          key={i}
          label={label}
          stepIndex={i}
          currentStep={currentStep}
        />
      ))}
    </div>
  )
}

export default function Steps({
  currentStep,
  setCurrentStep,
  nextStepAllowed,
  allowNextStep,
  labels,
  children,
}: PropsWithChildren<StepsProps>) {
  function goToPreviousStep() {
    setCurrentStep(currentStep - 1)
    allowNextStep(true)
  }

  function goToNextStep() {
    setCurrentStep(currentStep + 1)
    allowNextStep(false)
  }

  const StepsContent = children as React.ReactNode[]

  const lastStepIndex = (StepsContent?.length ?? 0) - 1

  return (
    <div className="flex flex-col gap-10 items-center lg:items-stretch">
      <StepsProgress labels={labels} currentStep={currentStep} />
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
          disabled={currentStep === lastStepIndex || !nextStepAllowed}
          className="flex gap-1 items-center bg-zinc-700 text-sm text-white px-4 py-1.5 rounded-md disabled:opacity-30"
        >
          <span>Next</span>
          <IconChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
