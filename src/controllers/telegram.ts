import bot from '../services/telegram';
import './grayscale/commands';
import prisma from '../database';

bot.on('text', (ctx) => {
  ctx.reply(
    'This bot only works with commands, type a / to see the available commands'
  );
});

bot.on('group_chat_created', (ctx) => {
  ctx.reply(
    'Hello everyone. You can interact with me by commands. Type / and see all available commands!'
  );
});

bot.on('new_chat_members', async (ctx) => {
  if (
    ctx.update.message.new_chat_members.filter(
      (b) => b.username === 'btchodl_bot'
    ).length > 0
  ) {
    if (ctx.chat) {
      await prisma.chat.create({
        data: {
          chatId: String(ctx.chat.id),
        },
      });
    }
    ctx.reply(
      'Hello everyone. You can interact with me by commands. Type / and see all available commands!'
    );
  }
});

bot.on('left_chat_member', async (ctx) => {
  if (
    ctx.update.message.left_chat_member.username === 'btchodl_bot' &&
    ctx.chat
  ) {
    await prisma.chat.delete({
      where: {
        chatId: String(ctx.chat.id),
      },
    });
  }
});

bot.catch((e, ctx) => {
  console.log('Error: ', e);
  ctx.reply('Something went wrong with your request');
});
