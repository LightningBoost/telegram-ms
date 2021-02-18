/*
  Warnings:

  - Added the required column `type` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Service" AS ENUM ('GRAYSCALE');

-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "type" "Service" NOT NULL;
