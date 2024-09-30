import { Injectable } from '@nestjs/common'
import { Schedule, SchedulingRepository } from '@barba/core'
import { PrismaService } from 'src/db/prisma.service'

@Injectable()
export class SchedulingService implements SchedulingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(scheduling: Schedule): Promise<void> {
    await this.prismaService.schedule.create({
      data: {
        date: scheduling.date,
        user: { connect: { id: scheduling.user.id } },
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
        user: {
          email,
        },
        date: {
          gte: new Date(),
        },
      },
      include: {
        services: true,
        professional: true,
        user: true,
      },
      orderBy: {
        date: 'desc',
      },
    })
  }

  async searchByProfessionalAndDate(professionalId: number, date: Date): Promise<Schedule[]> {
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
      include: { services: true, user: true, professional: true },
    })

    return result
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.schedule.delete({
      where: {
        id: id,
      },
      include: {
        services: true,
      },
    })
  }
}
