/*
  Warnings:

  - Added the required column `citizenId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "citizenId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "citizens" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "block" TEXT NOT NULL,

    CONSTRAINT "citizens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "citizens_name_key" ON "citizens"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "citizens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
