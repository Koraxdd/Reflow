-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
