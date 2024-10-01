import { Schedule, GetBusyTimes, User } from '@barbers-blade/core'
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

  @Get(':professional/:date')
  searchByProfessionalAndDate(@Param('professional') professional: string, @Param('date') dateParam: string) {
    return this.service.searchByProfessionalAndDate(+professional, new Date(dateParam))
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @LoggedInUser() loggedInUser: User) {
    if (!loggedInUser.isBarber) {
      throw new HttpException('Unauthorized user, only barbers can delete', 401)
    }
    await this.service.delete(+id)
  }
}
