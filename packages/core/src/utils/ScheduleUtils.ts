import { DateUtils } from "../../dist";

export default class ScheduleUtils {
  private static minutes = [0, 15, 30, 45];

  static dayHours() {
    return {
      morning: this.getTimes([8, 9, 10, 11]),
      afternoon: this.getTimes([14, 15, 16, 17]),
      night: this.getTimes([18, 19, 20, 21]),
    };
  }

  private static getTimes(hours: number[]) {
    return hours
      .map((hour) =>
        this.minutes.map(
          (minute) =>
            `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
        )
      )
      .flat();
  }
}
