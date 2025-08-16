/*
  Warnings:

  - You are about to drop the column `userId` on the `complaints` table. All the data in the column will be lost.
  - You are about to drop the column `citizenId` on the `users` table. All the data in the column will be lost.
  - Added the required column `idUser` to the `complaints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCitizen` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "complaints" DROP CONSTRAINT "complaints_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_citizenId_fkey";

-- AlterTable
ALTER TABLE "complaints" DROP COLUMN "userId",
ADD COLUMN     "idUser" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "citizenId",
ADD COLUMN     "idCitizen" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_idCitizen_fkey" FOREIGN KEY ("idCitizen") REFERENCES "citizens"("idCitizen") ON DELETE RESTRICT ON UPDATE CASCADE;
