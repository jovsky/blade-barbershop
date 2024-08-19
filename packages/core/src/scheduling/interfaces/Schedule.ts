import { Professional } from "../../professional";
import { Service } from "../../service";
import { User } from "../../user";

export default interface Schedule {
  id: number;
  user: User;
  date: Date;
  professional: Professional;
  services: Service[];
}