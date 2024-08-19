import { Injectable } from '@nestjs/common'
import { User } from '@barba/core'
import { PrismaService } from 'src/db/prisma.service'
import { User as PrismaUser } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prismaService.user.upsert({
      where: { id: user.id ?? -1 },
      update: user as PrismaUser,
      create: user as PrismaUser,
    })
  }

  async searchByEmail(email: string): Promise<User | null> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: { email },
    })
    return user
  }
}
