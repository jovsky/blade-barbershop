import { Schedule, GetBusyTimes } from "@barba/core"
import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { SchedulingService } from "./scheduling.service"

@Controller("scheduling")
export class SchedulingController {
  constructor(private readonly service: SchedulingService) {}

  @Post()
  create(@Body() scheduling: Schedule) {
    return this.service.create(scheduling)
  }

  @Get(":email")
  searchByEmail(@Param("email") email: string) {
    return this.service.searchByEmail(email)
  }

  @Get("ocupacao/:profissional/:data")
  searchByProfessionalAndDate(@Param("profissional") profissional: string, @Param("data") dataParam: string) {
    const casoDeUso = new GetBusyTimes(this.service)
    return casoDeUso.executar(+profissional, new Date(dataParam))
  }
}
