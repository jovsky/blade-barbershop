import Schedule from "./Schedule";

export default interface SchedulingRepository {
  create(scheduling: Schedule): Promise<void>;
  searchByEmail(email: string): Promise<Schedule[]>;
  searchByProfessionalAndDate(
    professional: number,
    date: Date
  ): Promise<Schedule[]>;
  delete(id: number): Promise<void>
}
