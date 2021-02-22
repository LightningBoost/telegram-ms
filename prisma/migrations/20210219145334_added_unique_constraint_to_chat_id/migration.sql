/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[chatId]` on the table `Chat`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Chat.chatId_unique" ON "Chat"("chatId");
