import { Module } from "@nestjs/common"
import { DbModule } from "./db/db.module"
import { ServiceModule } from "./service/service.module"
import { SchedulingModule } from "./scheduling/scheduling.module"
import { ProfessionalModule } from "./professional/professional.module"

@Module({
  imports: [DbModule, ServiceModule, SchedulingModule, ProfessionalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
