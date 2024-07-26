import { DateUtils } from "@barba/core"

export interface DayInputProps {
  dateTime: Date
  onDateChange(date: Date): void
}

export default function DayInput(props: DayInputProps) {
  function renderDay(date: Date) {
    if (date.getDay() === 0) {
      date.setDate(date.getDate() + 1)
    }

    const isSelected = date.getDate() === props.dateTime.getDate()
    return (
      <div
        onClick={() => props.onDateChange(date)}
        className={`
                    flex-1 flex flex-col items-center gap-2 py-4 cursor-pointer
                    ${isSelected ? "bg-yellow-400 text-black" : "text-zinc-400"}
                `}
      >
        <div className="flex items-center gap-1">
          <span className="text-2xl font-black">{date.getDate()}</span>
          <span className="text-xs font-light uppercase">
            {date.toLocaleDateString("pt-BR", { month: "short" }).slice(0, 3)}
          </span>
        </div>
        <div
          className={`
                        text-center text-xs font-light uppercase 
                        ${isSelected ? "bg-black/10" : "bg-white/10"}
                        py-0.5 px-3 rounded-full
                    `}
        >
          {date.toLocaleDateString("pt-BR", { weekday: "short" }).slice(0, 3)}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <span className="text-sm uppercase text-zinc-400">Available Days</span>
      <div className="flex gap-5 bg-zinc-950 rounded-lg overflow-hidden">
        {Array.from({ length: 7 })
          .map((_, i) => new Date(DateUtils.today().getTime() + 86400000 * i))
          .filter((date) => date.getDay() !== 0)
          .map((date) => renderDay(date))}
      </div>
    </div>
  )
}
