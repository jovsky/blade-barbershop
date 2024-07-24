export default class DateUtils {
    static today() {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return today
    }

    // new Date(), '09:45'
    static applyHour(date: Date, hour: string): Date {
        const newDate = new Date(date)
        const parts = hour.split(':')
        newDate.setHours(parseInt(parts[0]!), parseInt(parts[1]!))
        return newDate
    }
}
