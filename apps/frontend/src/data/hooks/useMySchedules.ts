import { Schedule } from '@barbers-blade/core'
import { useCallback, useEffect, useState } from 'react'
import useAPI from './useAPI'
import useUser from './useUser'

export default function useMySchedules() {
    const { user } = useUser()
    const { httpGet, httpDelete } = useAPI()
    const [date, setDate] = useState<Date>(new Date())
    const [schedules, setSchedules] = useState<Schedule[]>([])

    const loadSchedules = useCallback(async () => {
        if (!user) return
        const dtString = date.toISOString().slice(0, 10)
        const _schedules = user.isBarber 
          ? await httpGet(`scheduling/professional/${user.id}/${dtString}`) as Schedule[]
          : await httpGet(`scheduling/user/${user.id}/${dtString}`) as Schedule[]
        setSchedules(_schedules)
    }, [httpGet, user, date])

    useEffect(() => {
        loadSchedules()
    }, [loadSchedules])

    async function deleteSchedule(id: number) {
        await httpDelete(`scheduling/${id}`)
        setSchedules(schedules.filter((a) => a.id !== id))
    }

    return {
        date,
        schedules,
        changeDate: setDate,
        deleteSchedule,
    }
}
