import { Injectable } from "@nestjs/common"
// import { RepositorioScheduling } from "@barba/core"
import { PrismaService } from "src/db/prisma.service"

@Injectable()
// export class SchedulingRepository implements RepositorioScheduling {
export class SchedulingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // async criar(scheduling: Scheduling): Promise<void> {
  //   await this.prismaService.scheduling.create({
  //     data: {
  //       data: scheduling.data,
  //       emailCliente: scheduling.emailCliente,
  //       profissional: { connect: { id: scheduling.profissional.id } },
  //       servicos: {
  //         connect: scheduling.servicos.map((servico) => ({ id: servico.id })),
  //       },
  //     },
  //   })
  // }

  // async buscarPorEmail(email: string): Promise<Scheduling[]> {
  //   return this.prismaService.scheduling.findMany({
  //     where: {
  //       emailCliente: email,
  //       data: {
  //         gte: new Date(),
  //       },
  //     },
  //     include: {
  //       servicos: true,
  //       profissional: true,
  //     },
  //     orderBy: {
  //       data: "desc",
  //     },
  //   })
  // }

  // async buscarPorProfissionalEData(
  //   profissional: number,
  //   data: Date,
  // ): Promise<Scheduling[]> {
  //   const ano = data.getFullYear()
  //   const mes = data.getUTCMonth()
  //   const dia = data.getUTCDate()

  //   const inicioDoDia = new Date(ano, mes, dia, 0, 0, 0)
  //   const fimDoDia = new Date(ano, mes, dia, 23, 59, 59)

  //   const resultado: any = await this.prismaService.scheduling.findMany({
  //     where: {
  //       profissionalId: profissional,
  //       data: {
  //         gte: inicioDoDia,
  //         lte: fimDoDia,
  //       },
  //     },
  //     include: { servicos: true },
  //   })

  //   return resultado
  // }
}
