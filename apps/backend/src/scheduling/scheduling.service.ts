import { Injectable } from "@nestjs/common"
import { ProfessionalDateSearchResult, Schedule, SchedulingRepository } from "@barba/core"
import { PrismaService } from "src/db/prisma.service"

@Injectable()
export class SchedulingService implements SchedulingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(scheduling: Schedule): Promise<void> {
    await this.prismaService.schedule.create({
      data: {
        date: scheduling.date,
        costumerEmail: scheduling.costumerEmail,
        professional: { connect: { id: scheduling.professional.id } },
        services: {
          connect: scheduling.services.map((servico) => ({ id: servico.id })),
        },
      },
    })
  }

  async searchByEmail(email: string): Promise<Schedule[]> {
    return this.prismaService.schedule.findMany({
      where: {
        costumerEmail: email,
        date: {
          gte: new Date(),
        },
      },
      include: {
        services: true,
        professional: true,
      },
      orderBy: {
        date: "desc",
      },
    })
  }

  async searchByProfessionalAndDate(professionalId: number, date: Date): Promise<ProfessionalDateSearchResult[]> {
    const year = date.getFullYear()
    const month = date.getUTCMonth()
    const day = date.getUTCDate()

    const startDay = new Date(year, month, day, 0, 0, 0)
    const endDay = new Date(year, month, day, 23, 59, 59)

    const result = await this.prismaService.schedule.findMany({
      where: {
        professionalId,
        date: {
          gte: startDay,
          lte: endDay,
        },
      },
      include: { services: true },
    })

    return result
  }
}
