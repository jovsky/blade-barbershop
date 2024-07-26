import { Service } from "../service";

export default interface ProfessionalDateSearchResult {
  id: number
  costumerEmail: string
  date: Date
  professionalId: number
  services: Service[]
}
