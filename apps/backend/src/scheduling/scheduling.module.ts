import { MiddlewareConsumer, Module } from '@nestjs/common'
import { SchedulingController } from './scheduling.controller'
import { SchedulingService } from './scheduling.service'
import { DbModule } from 'src/db/db.module'
import { UserMiddleware } from 'src/user/user.middleware'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [DbModule, UserModule],
  controllers: [SchedulingController],
  providers: [SchedulingService],
})
export class SchedulingModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(SchedulingController)
  }
}
