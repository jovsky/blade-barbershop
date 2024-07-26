import { createContext, useCallback, useEffect, useState } from "react"
import { Professional, Schedule, Service } from "@barba/core"
import { DateUtils } from "@barba/core"
import useUser from "../hooks/useUser"
import useAPI from "../hooks/useAPI"

interface SchedulingContextProps {
  professional: Professional | null
  services: Service[]
  dateTime: Date
  busyTimes: string[]
  totalDuration(): string
  totalPrice(): number
  numberSlots(): number
  selectProfessional(professional: Professional): void
  selectServices(services: Service[]): void
  selectDateTime(data: Date): void
  schedule(): Promise<void>
}

export const SchedulingContext = createContext({} as SchedulingContextProps)

export function SchedulingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [dateTime, setDateTime] = useState<Date>(DateUtils.today())

  const { user } = useUser()
  const [busyTimes, setBusyTimes] = useState<string[]>([])
  const { httpGet, httpPost } = useAPI()

  function selectProfessional(professional: Professional) {
    setProfessional(professional)
  }

  function selectServices(services: Service[]) {
    setServices(services)
  }

  function totalDuration() {
    const duration = services.reduce((acc, { slots }) => acc + slots * 15, 0)

    return `${Math.trunc(duration / 60)}h ${duration % 60}m`
  }

  function totalPrice() {
    return services.reduce((acc, atual) => acc + atual.price, 0)
  }

  const selectDateTime = useCallback(function (time: Date) {
    setDateTime(time)
  }, [])

  function numberSlots() {
    const totalDeSlots = services.reduce((acc, service) => {
      return (acc += service.slots)
    }, 0)

    return totalDeSlots
  }

  async function schedule() {
    if (!user?.email) return

    const data: Omit<Schedule, "id"> = {
      costumerEmail: user.email,
      date: dateTime!,
      professional: professional!,
      services,
    }
    await httpPost("scheduling", data)

    limpar()
  }

  function limpar() {
    setDateTime(DateUtils.today())
    setBusyTimes([])
    setProfessional(null)
    setServices([])
  }

  const getBusyTimes = useCallback(
    async function (
      dateTime: Date,
      professional: Professional,
    ): Promise<string[]> {
      try {
        if (!dateTime || !professional) return []

        const dtString = dateTime.toISOString().slice(0, 10)

        const busyTimes = await httpGet(
          `scheduling/busy-schedules/${professional!.id}/${dtString}`,
        )
        console.log("busyTimes", professional.name, busyTimes)
        return busyTimes ?? []
      } catch (e) {
        return []
      }
    },
    [httpGet],
  )

  useEffect(() => {
    if (!dateTime || !professional) return
    getBusyTimes(dateTime, professional).then(setBusyTimes)
  }, [dateTime, professional, getBusyTimes])

  return (
    <SchedulingContext.Provider
      value={{
        dateTime,
        professional,
        services,
        busyTimes,
        totalDuration,
        totalPrice,
        selectDateTime,
        selectProfessional,
        numberSlots,
        selectServices,
        schedule,
      }}
    >
      {children}
    </SchedulingContext.Provider>
  )
}
