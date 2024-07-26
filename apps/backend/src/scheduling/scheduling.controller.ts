// import { Scheduling, ObterHorariosOcupados } from "@barba/core"
import { SchedulingRepository } from "./scheduling.service"
import { Controller } from "@nestjs/common"

@Controller("scheduling")
export class SchedulingController {
  constructor(private readonly repo: SchedulingRepository) {}

  // @Post()
  // criar(@Body() scheduling: Scheduling) {
  //   return this.repo.criar(scheduling)
  // }

  // @Get(":email")
  // buscarPorEmail(@Param("email") email: string) {
  //   return this.repo.buscarPorEmail(email)
  // }

  // @Get("ocupacao/:profissional/:data")
  // buscarOcupacaoPorProfissionalEData(
  //   @Param("profissional") profissional: string,
  //   @Param("data") dataParam: string,
  // ) {
  //   const casoDeUso = new ObterHorariosOcupados(this.repo)
  //   return casoDeUso.executar(+profissional, new Date(dataParam))
  // }
}
