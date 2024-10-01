import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@barbers-blade/core'

export const LoggedInUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})
