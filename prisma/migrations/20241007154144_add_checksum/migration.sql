/*
  Warnings:

  - You are about to drop the column `currency` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "currency",
ADD COLUMN     "checksum" TEXT NOT NULL DEFAULT '';
