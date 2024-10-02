import { View } from 'react-native'
import TimeInput from './TimeInput'
import DayInput from './DayInput'

export interface DateInputProps {
  date: Date
  numberSlots: number
  onDateChange: (date: Date) => void
}

export default function DateInput(props: DateInputProps) {
  const { date, numberSlots, onDateChange } = props

  return (
    <View>
      <DayInput date={date} onDateChange={onDateChange} />
      <TimeInput dateTime={date} numberSlots={numberSlots} onDateChange={onDateChange} />
    </View>
  )
}
