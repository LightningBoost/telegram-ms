import bot from '../services/telegram';
import '../scenes/grayscale';

bot.on('text', (ctx) => {
  ctx.reply(
    'This bot only works with commands, type a / to see the available commands'
  );
});

bot.catch((e, ctx) => {
  console.log('Error: ', e);
  ctx.reply('Something went wrong with your request');
});
