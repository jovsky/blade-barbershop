import DayInput from "./DayInput"
import TimeInput from "./TimeInput"

export interface DateInputProps {
  dateTime: Date
  numberSlots: number
  onDateChange: (dateTime: Date) => void
}

export default function DataInput(props: DateInputProps) {
  const { dateTime, numberSlots, onDateChange } = props

  return (
    <div className="flex flex-col gap-10">
      <DayInput dateTime={dateTime} onDateChange={onDateChange} />
      <TimeInput
        dateTime={dateTime}
        numberSlots={numberSlots}
        onDateChange={onDateChange}
      />
    </div>
  )
}
