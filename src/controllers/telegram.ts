import { Scenes, session, Markup } from 'telegraf';
import bot from '../services/telegram';
import grayscaleScene from '../scenes/grayscale';
import btcScene from '../scenes/btc';

const { leave } = Scenes.Stage;

const stage = new Scenes.Stage<Scenes.SceneContext>(
  [grayscaleScene, btcScene],
  { ttl: 600 }
);

bot.use(session());
bot.use(stage.middleware());

bot.hears(/Main menu/i, (ctx) => {
  leave<Scenes.SceneContext>();
  ctx.reply(
    'Choose an option',
    Markup.keyboard(['Grayscale', 'Bitcoin stats']).resize()
  );
});

bot.command('grayscale', (ctx) => ctx.scene.enter('grayscale'));
bot.hears('Grayscale', (ctx) => ctx.scene.enter('grayscale'));

bot.command('btc', (ctx) => ctx.scene.enter('btc'));
bot.hears('Bitcoin stats', (ctx) => ctx.scene.enter('btc'));

bot.command('help', (ctx) =>
  ctx.reply('Here is the list of available commands')
);

bot.on('message', (ctx) =>
  ctx.reply(
    'This bot is not smart enough and it only replies to commands. Try typing /help'
  )
);

bot.catch((e, ctx) => {
  console.log('Error: ', e);
  ctx.reply('Something went wrong with your request');
});
