/*
  Warnings:

  - The primary key for the `citizens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idCitizen` on the `citizens` table. All the data in the column will be lost.
  - You are about to drop the column `nameCitizen` on the `citizens` table. All the data in the column will be lost.
  - The primary key for the `complaints` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idComplaint` on the `complaints` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `complaints` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idCitizen` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `citizens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `citizens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `complaints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `citizenId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "complaints" DROP CONSTRAINT "complaints_idUser_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_idCitizen_fkey";

-- DropIndex
DROP INDEX "citizens_nameCitizen_key";

-- AlterTable
ALTER TABLE "citizens" DROP CONSTRAINT "citizens_pkey",
DROP COLUMN "idCitizen",
DROP COLUMN "nameCitizen",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "citizens_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "complaints" DROP CONSTRAINT "complaints_pkey",
DROP COLUMN "idComplaint",
DROP COLUMN "idUser",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "complaints_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "idCitizen",
DROP COLUMN "idUser",
ADD COLUMN     "citizenId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "citizens_name_key" ON "citizens"("name");

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "citizens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
