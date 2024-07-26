import { ProfessionalDateSearchResult } from "../../dist";
import Schedule from "./Schedule";

export default interface SchedulingRepository {
  create(scheduling: Schedule): Promise<void>;
  searchByEmail(email: string): Promise<Schedule[]>;
  searchByProfessionalAndDate(
    professional: number,
    date: Date
  ): Promise<ProfessionalDateSearchResult[]>;
}
