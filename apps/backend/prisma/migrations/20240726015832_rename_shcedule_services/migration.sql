/*
  Warnings:

  - You are about to drop the `scheduling` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ScheduleToService" DROP CONSTRAINT "_ScheduleToService_A_fkey";

-- DropForeignKey
ALTER TABLE "scheduling" DROP CONSTRAINT "scheduling_professionalId_fkey";

-- DropTable
DROP TABLE "scheduling";

-- CreateTable
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "costumerEmail" TEXT NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "professionalId" INTEGER NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleToService" ADD CONSTRAINT "_ScheduleToService_A_fkey" FOREIGN KEY ("A") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
