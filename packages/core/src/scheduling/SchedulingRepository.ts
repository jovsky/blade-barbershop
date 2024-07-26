import Schedule from "./Scheduling";

export default interface RepositorioScheduling {
  create(scheduling: Schedule): Promise<void>;
  searchByEmail(email: string): Promise<Schedule[]>;
  searchByProfessionalAndDate(
    professional: number,
    date: Date
  ): Promise<Schedule[]>;
}
