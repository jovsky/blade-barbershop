import { Schedule, ScheduleUtils, DateUtils } from '@barbers-blade/core'
import { IconCalendar, IconTrash } from '@tabler/icons-react'

export interface MySchedulesItemProps {
    schedule: Schedule
    delete: (id: number) => void
}

export default function MySchedulesItem(props: MySchedulesItemProps) {
    const { schedule } = props

    schedule.user.isBarber

    return (
        <div className="flex items-center gap-6 bg-zinc-800 rounded-md p-7">
            <IconCalendar size={60} stroke={1} />
            <div className="flex-1 flex flex-col">
                <span className="text-xl">{schedule.user.isBarber ? schedule.user.name : schedule.professional.name}</span>
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
