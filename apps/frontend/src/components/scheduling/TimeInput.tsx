import { FC, useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import { IconX } from "@tabler/icons-react"
import { ScheduleUtils, DateUtils } from "@barba/core"
import useScheduling from "@/data/hooks/useScheduling"

export interface HoursInputProps {
  dateTime: Date
  numberSlots: number
  onDateChange(date: Date): void
}

const TimeSlot: FC<HoursInputProps & { slotTime: string }> = ({
  dateTime,
  numberSlots,
  onDateChange,
  slotTime,
}) => {
  const [timeHovered, setHoveredSlot] = useState<string | null>(null)
  const { busyTimes } = useScheduling()

  const { morning, afternoon, night } = ScheduleUtils.dayHours()

  const timeSelected = DateUtils.getLocaleFormattedTime(dateTime)

  const getPeriod = useCallback(
    (time: string | null, numberSlots: number) => {
      if (!time) return []
      const times = morning.includes(time)
        ? morning
        : afternoon.includes(time)
          ? afternoon
          : night
      const index = times.findIndex((h) => time == h)
      return times.slice(index, index + numberSlots)
    },
    [afternoon, morning, night],
  )

  const hoveredInterval = getPeriod(timeHovered, numberSlots)

  const hasAvailableTime = hoveredInterval.length === numberSlots

  const highlightTime = hasAvailableTime && hoveredInterval.includes(slotTime)

  const selectedPeriod = getPeriod(timeSelected, numberSlots)

  const isSelected =
    selectedPeriod.length === numberSlots && selectedPeriod.includes(slotTime)

  const notSelectable = !hasAvailableTime && hoveredInterval.includes(slotTime)

  const blockedPeriod =
    hoveredInterval.includes(slotTime) &&
    hoveredInterval.some((h) => busyTimes.includes(h))

  const isBusy = busyTimes.includes(slotTime)

  return (
    <div
      key={slotTime}
      className={cn(
        "flex justify-center items-center cursor-pointer h-8 border border-zinc-800 rounded select-none",
        {
          "text-white bg-green-500": isSelected,
          "bg-red-500": notSelectable || blockedPeriod,
          "bg-yellow-400": highlightTime,
          "cursor-not-allowed bg-zinc-800": isBusy,
        },
      )}
      onMouseEnter={(_) => setHoveredSlot(slotTime)}
      onMouseLeave={(_) => setHoveredSlot(null)}
      onClick={() => {
        if (notSelectable) return
        if (isBusy || blockedPeriod) return
        onDateChange(DateUtils.applyTime(dateTime, slotTime))
      }}
    >
      <span
        className={cn("text-sm text-zinc-400", {
          "text-white font-semibold": isSelected,
          "text-black font-semibold": highlightTime,
          "text-zinc-400 font-semibold": isBusy,
        })}
      >
        {notSelectable || blockedPeriod || isBusy ? (
          <IconX size={18} className="text-white" />
        ) : (
          DateUtils.getLocaleFormattedTime(slotTime, true)
        )}
      </span>
    </div>
  )
}

export default function TimeInput(props: HoursInputProps) {
  const { morning, afternoon, night } = ScheduleUtils.dayHours()

  const mapComponent = (slotTime: string, i: number) => (
    <TimeSlot key={i} {...props} slotTime={slotTime} />
  )

  return (
    <div className="flex flex-col gap-5">
      <span className="text-sm uppercase text-zinc-400">Times Available</span>
      <div className="flex flex-col gap-3 select-none">
        <span className="text-xs uppercase text-zinc-400">Morning</span>
        <div className="grid grid-cols-8 gap-1">
          {morning.map(mapComponent)}
        </div>

        <span className="text-xs uppercase text-zinc-400">Afternoon</span>
        <div className="grid grid-cols-8 gap-1">
          {afternoon.map(mapComponent)}
        </div>

        <span className="text-xs uppercase text-zinc-400">Night</span>
        <div className="grid grid-cols-8 gap-1">{night.map(mapComponent)}</div>
      </div>
    </div>
  )
}
