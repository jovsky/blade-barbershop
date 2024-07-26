/*
  Warnings:

  - You are about to drop the column `customerEmail` on the `scheduling` table. All the data in the column will be lost.
  - You are about to drop the `_SchedulingToService` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `costumerEmail` to the `scheduling` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SchedulingToService" DROP CONSTRAINT "_SchedulingToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_SchedulingToService" DROP CONSTRAINT "_SchedulingToService_B_fkey";

-- AlterTable
ALTER TABLE "scheduling" DROP COLUMN "customerEmail",
ADD COLUMN     "costumerEmail" TEXT NOT NULL;

-- DropTable
DROP TABLE "_SchedulingToService";

-- CreateTable
CREATE TABLE "_ScheduleToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ScheduleToService_AB_unique" ON "_ScheduleToService"("A", "B");

-- CreateIndex
CREATE INDEX "_ScheduleToService_B_index" ON "_ScheduleToService"("B");

-- AddForeignKey
ALTER TABLE "_ScheduleToService" ADD CONSTRAINT "_ScheduleToService_A_fkey" FOREIGN KEY ("A") REFERENCES "scheduling"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleToService" ADD CONSTRAINT "_ScheduleToService_B_fkey" FOREIGN KEY ("B") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
