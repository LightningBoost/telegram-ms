/*
  Warnings:

  - You are about to drop the column `type` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "type",
ADD COLUMN     "subscription" "Service"[];
