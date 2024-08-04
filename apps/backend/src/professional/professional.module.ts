import { Module } from '@nestjs/common'
import { ProfessionalController } from './professional.controller'
import { DbModule } from 'src/db/db.module'

@Module({
  imports: [DbModule],
  controllers: [ProfessionalController],
})
export class ProfessionalModule {}
