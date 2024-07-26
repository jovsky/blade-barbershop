export default class ScheduleUtils {
  private static minutes = [0, 15, 30, 45];

  static dayHours() {
    return {
      morning: this.getTimes([8, 9, 10, 11]),
      afternoon: this.getTimes([14, 15, 16, 17]),
      night: this.getTimes([18, 19, 20, 21]),
    };
  }

  private static getTimes(times: number[]) {
    return times.reduce((times, time) => {
      const all = this.minutes.map((minute) => {
        return `${String(time).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      });
      return times.concat(all);
    }, [] as string[]);
  }
}
