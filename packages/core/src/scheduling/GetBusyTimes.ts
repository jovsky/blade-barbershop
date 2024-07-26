import { SLOT_TIME } from "../constants";
import SchedulingRepository from "./interfaces/SchedulingRepository";

export default class GetBusyTimes {
  constructor(private readonly repo: SchedulingRepository) {}

  async executar(professionalId: number, date: Date): Promise<string[]> {
    const schedules = await this.repo.searchByProfessionalAndDate(
      professionalId,
      date
    );
    const dados = schedules
      .map((schedule) => {
        return {
          time: schedule.date,
          slots: schedule.services.reduce((total, s) => total + s.slots, 0),
        };
      })
      .reduce(
        (busyTimes: Date[], { time, slots }: { time: Date; slots: number }) => {
          const times = Array.from({ length: slots }, (_, i) =>
            this.sumMinutes(time, i * SLOT_TIME)
          );
          return [...busyTimes, ...times];
        },
        []
      )
      .map((d) => d.toTimeString().slice(0, 5));

    return dados; // [ '10:00', '10:15', '10:30', '10:45', '14:15' ]
  }

  private sumMinutes(time: Date, minutos: number): Date {
    return new Date(time.getTime() + minutos * 60000);
  }
}
