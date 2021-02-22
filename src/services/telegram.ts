import { Telegraf } from 'telegraf';

const token = process.env.TELEGRAM_BOT_API;

if (token === undefined) {
  throw new Error('Telegram token must be provided');
}

const bot = new Telegraf(process.env.TELEGRAM_BOT_API || '');

if (process.env.NODE_ENV === 'development') {
  bot.use(Telegraf.log());
}

export default bot;
