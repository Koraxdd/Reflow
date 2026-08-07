/*
  Warnings:

  - Added the required column `name` to the `WatchlistItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WatchlistItem" ADD COLUMN     "name" TEXT NOT NULL;
