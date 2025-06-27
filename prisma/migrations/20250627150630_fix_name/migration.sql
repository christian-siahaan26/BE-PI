/*
  Warnings:

  - You are about to drop the column `username` on the `complaints` table. All the data in the column will be lost.
  - Added the required column `name` to the `complaints` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "complaints" DROP COLUMN "username",
ADD COLUMN     "name" TEXT NOT NULL;
