import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@barba/core'

export const LoggedInUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})
