import { useState } from "react"
import { cn } from "@/lib/utils"
import { IconX } from "@tabler/icons-react"
import { ScheduleUtils, DateUtils } from "@barba/core"
import useScheduling from "@/data/hooks/useScheduling"

export interface HoursInputProps {
  dateTime: Date
  numberSlots: number
  onDateChange(date: Date): void
}

export default function HoursInput(props: HoursInputProps) {
  const [slotHover, setHoveredSlot] = useState<string | null>(null)
  const { busyTimes } = useScheduling()
  const { morning, afternoon, night } = ScheduleUtils.dayHours()

  const timeSelected = props.dateTime.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  function obtainPeriod(time: string | null, numberSlots: number) {
    if (!time) return []
    const times = morning.includes(time)
      ? morning
      : afternoon.includes(time)
        ? afternoon
        : night
    const index = times.findIndex((h) => time == h)
    return times.slice(index, index + numberSlots)
  }

  function renderTime(time: string) {
    const period = obtainPeriod(slotHover, props.numberSlots)
    const hasAvailableTime = period.length === props.numberSlots
    const highlightTime = hasAvailableTime && period.includes(time)
    const selectedPeriod = obtainPeriod(timeSelected, props.numberSlots)
    const selected =
      selectedPeriod.length === props.numberSlots &&
      selectedPeriod.includes(time)
    const notSelectable = !hasAvailableTime && period.includes(time)
    const blockedPeriod =
      period.includes(time) && period.some((h) => busyTimes.includes(h))
    const isBusy = busyTimes.includes(time)

    return (
      <div
        key={time}
        className={cn(
          "flex justify-center items-center cursor-pointer h-8 border border-zinc-800 rounded select-none",
          {
            "bg-yellow-400": highlightTime,
            "bg-red-500": notSelectable || blockedPeriod,
            "text-white bg-green-500": selected,
            "cursor-not-allowed bg-zinc-800": isBusy,
          },
        )}
        onMouseEnter={(_) => setHoveredSlot(time)}
        onMouseLeave={(_) => setHoveredSlot(null)}
        onClick={() => {
          if (notSelectable) return
          if (isBusy || blockedPeriod) return
          props.onDateChange(DateUtils.applyTime(props.dateTime, time))
        }}
      >
        <span
          className={cn("text-sm text-zinc-400", {
            "text-black font-semibold": highlightTime,
            "text-white font-semibold": selected,
            "text-zinc-400 font-semibold": isBusy,
          })}
        >
          {notSelectable || blockedPeriod || isBusy ? (
            <IconX size={18} className="text-white" />
          ) : (
            time
          )}
        </span>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-5">
      <span className="text-sm uppercase text-zinc-400">Times Available</span>
      <div className="flex flex-col gap-3 select-none">
        <span className="text-xs uppercase text-zinc-400">Morning</span>
        <div className="grid grid-cols-8 gap-1">{morning.map(renderTime)}</div>

        <span className="text-xs uppercase text-zinc-400">Afternoon</span>
        <div className="grid grid-cols-8 gap-1">
          {afternoon.map(renderTime)}
        </div>

        <span className="text-xs uppercase text-zinc-400">Night</span>
        <div className="grid grid-cols-8 gap-1">{night.map(renderTime)}</div>
      </div>
    </div>
  )
}
