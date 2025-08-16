/*
  Warnings:

  - You are about to drop the column `name` on the `citizens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameCitizen]` on the table `citizens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nameCitizen` to the `citizens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "citizens_name_key";

-- AlterTable
ALTER TABLE "citizens" DROP COLUMN "name",
ADD COLUMN     "nameCitizen" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "citizens_nameCitizen_key" ON "citizens"("nameCitizen");
