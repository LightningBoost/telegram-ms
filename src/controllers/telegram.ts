import { Scenes, session } from 'telegraf';
import bot from '../services/telegram';
import grayscaleScene from '../scenes/grayscale';
import btcScene from '../scenes/btc';

const stage = new Scenes.Stage<Scenes.SceneContext>(
  [grayscaleScene, btcScene],
  { ttl: 600 }
);

bot.use(session());
bot.use(stage.middleware());

bot.command('grayscale', (ctx) => ctx.scene.enter('grayscale'));
bot.command('btc', (ctx) => ctx.scene.enter('btc'));

bot.command('help', (ctx) =>
  ctx.reply('Here is the list of available commands')
);

bot.on('message', (ctx) =>
  ctx.reply(
    'This bot is not smart enough and it only replies to commands. Try typing /help'
  )
);

bot.catch((e, ctx) => {
  ctx.reply('Something went wrong with your request');
});
