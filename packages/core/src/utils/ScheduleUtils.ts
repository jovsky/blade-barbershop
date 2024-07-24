export default class ScheduleUtils {
  private static minutos = [0, 15, 30, 45]

  static dayHours() {
      return {
          manha: this.getTimes([8, 9, 10, 11]),
          tarde: this.getTimes([14, 15, 16, 17]),
          noite: this.getTimes([18, 19, 20, 21]),
      }
  }

  private static getTimes(horas: number[]) {
      return horas.reduce((times, hour) => {
          const all = this.minutos.map((minute) => {
              return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
          })
          return times.concat(all)
      }, [] as string[])
  }
}
