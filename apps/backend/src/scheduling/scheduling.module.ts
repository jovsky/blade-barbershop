import { Module } from "@nestjs/common"
import { SchedulingController } from "./scheduling.controller"
import { SchedulingRepository } from "./scheduling.service"
import { DbModule } from "src/db/db.module"

@Module({
  imports: [DbModule],
  controllers: [SchedulingController],
  providers: [SchedulingRepository],
})
export class SchedulingModule {}
