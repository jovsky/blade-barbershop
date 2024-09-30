import { Schedule } from '@barba/core'
import { useCallback, useEffect, useState } from 'react'
import useAPI from './useAPI'
import useUser from './useUser'

export default function useProfessionalSchedules() {
    const { user } = useUser()
    const { httpGet, httpDelete } = useAPI()
    const [date, setDate] = useState<Date>(new Date())
    const [schedules, setSchedules] = useState<Schedule[]>([])

    const carregarAgendamentos = useCallback(async () => {
        if (!user) return
        const dtString = date.toISOString().slice(0, 10)
        const _schedules = await httpGet(`scheduling/${user.id}/${dtString}`) as Schedule[]
        setSchedules(_schedules)
    }, [httpGet, user, date])

    useEffect(() => {
        carregarAgendamentos()
    }, [carregarAgendamentos])

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
