import { Module } from '@nestjs/common'
import { BcryptProvider } from './bcrypt.provider'
import { UserService } from './user.service'
import { UserMiddleware } from './user.middleware'
import { DbModule } from 'src/db/db.module'
import { UserController } from './user.controller'

@Module({
  imports: [DbModule],
  exports: [UserMiddleware, UserService],
  controllers: [UserController],
  providers: [UserMiddleware, BcryptProvider, UserService],
})
export class UserModule {}
