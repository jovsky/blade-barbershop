import { HttpException, Injectable, NestMiddleware } from '@nestjs/common'
import { Response, NextFunction, Request } from 'express'
import { UserService } from './user.service'
import * as jwt from 'jsonwebtoken'
import { User } from '@barbers-blade/core'

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly repo: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.replace('Bearer ', '')

    if (!token) {
      throw new HttpException('Token não informado', 401)
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as User
    const user = await this.repo.searchByEmail(payload.email!)

    if (!user) {
      throw new HttpException('Usuário não encontrado', 401)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(req as any).user = user
    next()
  }
}
