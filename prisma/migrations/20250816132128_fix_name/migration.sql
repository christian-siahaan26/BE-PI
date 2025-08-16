/*
  Warnings:

  - The primary key for the `citizens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `citizens` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `citizens` table. All the data in the column will be lost.
  - The primary key for the `complaints` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `complaints` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `complaints` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `complaints` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `citizenId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameCitizen]` on the table `citizens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nameCitizen` to the `citizens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `complaints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameCitizen` to the `complaints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCitizen` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "complaints" DROP CONSTRAINT "complaints_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_citizenId_fkey";

-- DropIndex
DROP INDEX "citizens_name_key";

-- AlterTable
ALTER TABLE "citizens" DROP CONSTRAINT "citizens_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "idCitizen" SERIAL NOT NULL,
ADD COLUMN     "nameCitizen" TEXT NOT NULL,
ADD CONSTRAINT "citizens_pkey" PRIMARY KEY ("idCitizen");

-- AlterTable
ALTER TABLE "complaints" DROP CONSTRAINT "complaints_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "userId",
ADD COLUMN     "idComplaint" SERIAL NOT NULL,
ADD COLUMN     "idUser" INTEGER NOT NULL,
ADD COLUMN     "nameCitizen" TEXT NOT NULL,
ADD CONSTRAINT "complaints_pkey" PRIMARY KEY ("idComplaint");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "citizenId",
DROP COLUMN "id",
ADD COLUMN     "idCitizen" INTEGER NOT NULL,
ADD COLUMN     "idUser" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "citizens_nameCitizen_key" ON "citizens"("nameCitizen");

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_idCitizen_fkey" FOREIGN KEY ("idCitizen") REFERENCES "citizens"("idCitizen") ON DELETE RESTRICT ON UPDATE CASCADE;
