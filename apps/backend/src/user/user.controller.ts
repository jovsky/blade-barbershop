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

  @Post('login')
  async login(@Body() dados: { email: string; password: string }): Promise<string> {
    const useCase = new UserSignIn(this.repo, this.cripto)
    const user = await useCase.execute(dados.email, dados.password)
    const segredo = process.env.JWT_SECRET!
    return jwt.sign(user, segredo, { expiresIn: '15d' })
  }

  @Post('registrar')
  async registrar(@Body() user: User): Promise<void> {
    const casoDeUso = new UserSignUp(this.repo, this.cripto)
    await casoDeUso.execute(user)
  }
}
