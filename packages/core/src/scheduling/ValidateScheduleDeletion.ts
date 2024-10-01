import { User } from "../user";
import SchedulingRepository from "./interfaces/SchedulingRepository";

export default class ValidateScheduleDeletion {
  constructor(private readonly repo: SchedulingRepository) {}

  async execute(scheduleId: string, loggedInUser: User): Promise<number> {
    const schedule = await this.repo.searchById(+scheduleId)

    if (!schedule) return 404

    if (
      (loggedInUser.isBarber && schedule.professional.id !== loggedInUser.id) ||
      (!loggedInUser.isBarber && schedule.user.id !== loggedInUser.id)
    ) {
      return 401
    }
    

    return null;
  }
}
