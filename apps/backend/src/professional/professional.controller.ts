import { Controller, Get } from '@nestjs/common'
import { PrismaService } from 'src/db/prisma.service'

@Controller('professionals')
export class ProfessionalController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getAll() {
    return this.prisma.professional.findMany()
  }
}
