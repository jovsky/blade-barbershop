import { Schedule, GetBusyTimes, User, ValidateScheduleDeletion } from '@barbers-blade/core'
import { Body, Controller, Delete, Get, HttpException, Param, Post } from '@nestjs/common'
import { SchedulingService } from './scheduling.service'
import { LoggedInUser } from 'src/user/user.decorator'

@Controller('scheduling')
export class SchedulingController {
  constructor(private readonly service: SchedulingService) {}

  @Post()
  create(
    @Body() scheduling: Schedule,
    @LoggedInUser() loggedInUser: User,
    // @Request() req: { user?: string } /** ExpressRequest from express */
  ) {
    if (scheduling.user.id !== loggedInUser.id) {
      throw new HttpException('Unauthorized action, you can only create schedules for yourself', 401)
    }
    return this.service.create(scheduling)
  }

  @Get(':email')
  searchByEmail(@Param('email') email: string) {
    return this.service.searchByEmail(email)
  }

  @Get('busy-times/:professional/:date')
  searchBusyTimesByProfessionalAndDate(@Param('professional') professional: string, @Param('date') dateParam: string) {
    const useCase = new GetBusyTimes(this.service)
    return useCase.execute(+professional, new Date(dateParam))
  }

  @Get('professional/:professional/:date')
  searchByProfessionalAndDate(@Param('professional') professional: string, @Param('date') dateParam: string) {
    return this.service.searchByProfessionalAndDate(+professional, new Date(dateParam))
  }

  @Get('user/:user/:date')
  searchByUserAndDate(@Param('user') user: string, @Param('date') dateParam: string) {
    return this.service.searchByUserAndDate(+user, new Date(dateParam))
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @LoggedInUser() loggedInUser: User) {
    const useCase = new ValidateScheduleDeletion(this.service)
    const errorCode = await useCase.execute(id, loggedInUser)

    if (errorCode === 404) throw new HttpException('Schedule not found', 404)

    if (errorCode === 401) throw new HttpException('Unauthorized action, you can only delete your schedules', 401)

    await this.service.delete(+id)
  }
}
