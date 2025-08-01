/*
  Warnings:

  - A unique constraint covering the columns `[nik]` on the table `citizens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nik` to the `citizens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "citizens" ADD COLUMN     "nik" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "citizens_nik_key" ON "citizens"("nik");
