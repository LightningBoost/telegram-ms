import prisma from '../../database';
import bot from '../../services/telegram';
import { ISendDailyUpdate } from './interfaces';

export const sendDailyUpdate = async ({
  bought,
  total,
  fiat,
  change,
}: ISendDailyUpdate): Promise<void> => {
  const chatIds: { chatId: string }[] = await prisma.chat.findMany({
    where: {
      subscription: { has: 'GRAYSCALE' },
    },
    select: {
      chatId: true,
    },
  });
  chatIds.forEach((chat) => {
    bot.telegram.sendMessage(
      chat.chatId,
      `Grayscale daily update:

Today Grayscale bought ${bought} bitcoins, about $${fiat}

Grayscale now holds ${total} bitcoins, it's a change of ${(
        change * 100
      ).toFixed(0)}% from their last purchase
      `,
      { parse_mode: 'MarkdownV2' }
    );
  });
};
