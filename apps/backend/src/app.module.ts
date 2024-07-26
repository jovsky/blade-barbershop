import { Module } from "@nestjs/common"
import { DbModule } from "./db/db.module"
import { ServiceModule } from "./service/service.module"
import { SchedulingModule } from "./scheduling/scheduling.module"

@Module({
  imports: [DbModule, ServiceModule, SchedulingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
