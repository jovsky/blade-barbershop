"use client"
import SuccessfulScheduling from "@/components/scheduling/SuccessfulScheduling"
import Header from "@/components/shared/Header"

export default function PageSuccessfulScheduling() {
  return (
    <div className="flex flex-col bg-zinc-900">
      <Header
        title="Service Scheduling"
        description="Your appointment is guaranteed, hope to see you soon!"
      />
      <div className="container flex flex-col justify-around items-center py-10 gap-1">
        <SuccessfulScheduling />
      </div>
    </div>
  )
}
