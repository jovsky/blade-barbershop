import { UserService } from './user.service'
import { UserSignIn, UserSignUp, User } from '@barba/core'
import { Body, Controller, Post } from '@nestjs/common'
import { BcryptProvider } from './bcrypt.provider'
import * as jwt from 'jsonwebtoken'

@Controller('user')
export class UserController {
  constructor(
    private readonly repo: UserService,
    private readonly cripto: BcryptProvider,
  ) {}

  @Post('sign-in')
  async signIn(@Body() data: { email: string; password: string }): Promise<string> {
    const useCase = new UserSignIn(this.repo, this.cripto)
    const user = await useCase.execute(data.email, data.password)
    const secret = process.env.JWT_SECRET!
    return jwt.sign(user, secret, { expiresIn: '15d' })
  }

  @Post('sign-up')
  async signUp(@Body() user: User): Promise<void> {
    const useCase = new UserSignUp(this.repo, this.cripto)
    await useCase.execute(user)
  }
}
