import { Controller, Get } from "@nestjs/common"
import { PrismaService } from "src/db/prisma.service"

@Controller("services")
export class ServiceController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  buscarTodos() {
    return this.prisma.service.findMany()
  }
}
