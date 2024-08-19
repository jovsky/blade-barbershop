import { PrismaClient } from '@prisma/client'
import { Professional as PrismaProfessional, Service as PrismaService } from 'prisma/prisma-client'
import { services, professionals } from '@barba/core'

const prisma = new PrismaClient()

async function seed() {
  await prisma.professional.createMany({
    data: professionals as PrismaProfessional[],
  })
  await prisma.service.createMany({ data: services as PrismaService[] })

  await prisma.user.createMany({
    data: [
      {
        name: 'John Blade',
        email: 'joao@barbersblade.app',
        // password is: #Senha123
        password: '$2b$10$9LQTRK3LRzIddKYW2C4MTelydFzk5Ys4JoROPajNqvYshhrn1PRa6',
        phone: '11999999999',
        isBarber: true,
      },
    ],
  })
}

seed()
