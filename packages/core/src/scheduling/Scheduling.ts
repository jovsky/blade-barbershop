import { Professional } from "../professional";
import { Service } from "../service";

export default interface Schedule {
  id: number;
  costumerEmail: string;
  date: Date;
  professional: Professional;
  services: Service[];
}
