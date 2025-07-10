import { LOCALE } from '../constants'

export default class DateUtils {
  static today() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
  }

  // new Date(), '09:45'
  static applyTime(date: Date, time: string): Date {
    const newDate = new Date(date)
    const parts = time.split(':')

    newDate.setHours(parseInt(parts[0]!), parseInt(parts[1]!))
    return newDate
  }

  static toDateTimeLocaleString(date: Date) {
    return date.toLocaleString(LOCALE, {
      dateStyle: 'long',
      timeStyle: 'short',
    })
  }

  static getLocaleFormattedTime(date: Date | string, hour12 = false) {
    const newDate = typeof date === 'string' ? this.applyTime(new Date(), date) : date

    return newDate.toLocaleTimeString(LOCALE, {
      hour: '2-digit',
      minute: '2-digit',
      hour12,
    })
  }

  static formatDate(date: Date): string {
    return date.toLocaleDateString(LOCALE, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  static formatDateAndHour(date: Date): string {
    return date.toLocaleDateString(LOCALE, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
  }
}
