import bot from '../services/telegram';

bot.on('message', (msg) => {
  console.log(msg);
});
