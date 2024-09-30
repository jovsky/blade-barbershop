import { Schedule, ScheduleUtils, DateUtils } from '@barba/core'
import { IconCalendar, IconTrash } from '@tabler/icons-react'

export interface ProfessionalScheduleItemProps {
    schedule: Schedule
    delete: (id: number) => void
}

export default function ProfessionalScheduleItem(props: ProfessionalScheduleItemProps) {
    const { schedule } = props

    console.log('schedule', schedule)
    return (
        <div className="flex items-center gap-6 bg-zinc-800 rounded-md p-7">
            <IconCalendar size={60} stroke={1} />
            <div className="flex-1 flex flex-col">
                <span className="text-xl">{schedule.user.name}</span>
                <span className="text-zinc-400 text-sm">
                    {DateUtils.formatDateAndHour(new Date(schedule.date))}
                </span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xl font-black">
                    {ScheduleUtils.totalDuration(schedule.services)}
                </span>
                <span className="text-zinc-400">
                    R$ {schedule.services.reduce((acc, service) => acc + service.price, 0)}
                </span>
            </div>
            <div>
                <button className="button bg-red-500" onClick={() => props.delete(schedule.id)}>
                    <IconTrash size={24} stroke={1.5} />
                </button>
            </div>
        </div>
    )
}
