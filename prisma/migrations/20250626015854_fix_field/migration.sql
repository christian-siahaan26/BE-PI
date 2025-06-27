/*
  Warnings:

  - You are about to drop the `notes` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "notes";

-- CreateTable
CREATE TABLE "complaints" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "complaints_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
