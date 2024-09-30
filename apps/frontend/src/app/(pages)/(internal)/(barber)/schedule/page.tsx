'use client'
import { IconCalendarCancel } from '@tabler/icons-react'
import Header from '@/components/shared/Header'
import ProfessionalScheduleItem from '@/components/scheduling/ProfessionalScheduleItem'
import DayInput from '@/components/scheduling/DayInput'
import useProfessionalSchedules from '@/data/hooks/useProfessionalSchedules'

export default function PaginaAgenda() {
    const { date, schedules, changeDate, deleteSchedule } = useProfessionalSchedules()

    return (
        <div className="flex flex-col bg-zinc-900">
            <Header title="My Schedule" description="See and manage your schedules" />
            <div className="container flex flex-col gap-10 py-16">
                <DayInput dateTime={date} onDateChange={changeDate} />
                {schedules.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {schedules.map((schedule) => (
                            <ProfessionalScheduleItem
                                key={schedule.id}
                                schedule={schedule}
                                delete={deleteSchedule}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <IconCalendarCancel size={150} stroke={0.5} className="text-zinc-400" />
                        <span className="text-xl text-zinc-500 font-extralight w-64 text-center">
                            No schedules found for the selected date
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
