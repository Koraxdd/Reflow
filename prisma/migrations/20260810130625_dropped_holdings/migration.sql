/*
  Warnings:

  - You are about to drop the `Holding` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_userId_fkey";

-- DropTable
DROP TABLE "Holding";
