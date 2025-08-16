/*
  Warnings:

  - The primary key for the `citizens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `citizens` table. All the data in the column will be lost.
  - The primary key for the `complaints` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `complaints` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "complaints" DROP CONSTRAINT "complaints_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_citizenId_fkey";

-- AlterTable
ALTER TABLE "citizens" DROP CONSTRAINT "citizens_pkey",
DROP COLUMN "id",
ADD COLUMN     "idCitizen" SERIAL NOT NULL,
ADD CONSTRAINT "citizens_pkey" PRIMARY KEY ("idCitizen");

-- AlterTable
ALTER TABLE "complaints" DROP CONSTRAINT "complaints_pkey",
DROP COLUMN "id",
ADD COLUMN     "idComplaint" SERIAL NOT NULL,
ADD CONSTRAINT "complaints_pkey" PRIMARY KEY ("idComplaint");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "idUser" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("idUser");

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "citizens"("idCitizen") ON DELETE RESTRICT ON UPDATE CASCADE;
