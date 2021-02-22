import { gql } from 'graphql-request';
import Currency from 'currency.js';
import dayjs from 'dayjs';
import bot from '../services/telegram';
import grayscaleQuery from '../services/grayscale';
import { Graphql } from '../generated/grayscale/graphql';
import prisma from '../database';

// commands

// get holdings
bot.command('grayscale_holdings', async (ctx) => {
  const query = gql`
    query getLatest {
      getPurchase(take: 2) {
        date
        total
      }
    }
  `;
  ctx.reply('Checking the latest acquisition...');
  const data: { getPurchase: Graphql[] } = await grayscaleQuery.request(query);
  ctx.reply(
    `Grayscale holds on ${dayjs(data.getPurchase[0].date).format(
      'MM/DD/YYYY'
    )} approximately ${Currency(data.getPurchase[0].total, {
      symbol: '',
    }).format()} bitcoins`
  );
  if (data.getPurchase.length > 1) {
    ctx.reply(
      `It's a difference of ${Currency(data.getPurchase[1].total, {
        symbol: '',
      })
        .subtract(data.getPurchase[0].total)
        .format()} bitcoins since their last purchase on ${dayjs(
        data.getPurchase[1].date
      ).format('MM/DD/YYYY')}`
    );
  }
});

// subscribe
bot.command('grayscale_subscribe', async (ctx) => {
  if (ctx.chat && ctx.chat.id) {
    const chatDb = await prisma.chat.findUnique({
      where: {
        chatId: String(ctx.chat.id),
      },
    });
    if (chatDb) {
      if (chatDb.type.includes('GRAYSCALE')) {
        ctx.reply('You are already subscribed');
        return;
      }
      await prisma.chat.update({
        where: { chatId: String(ctx.chat.id) },
        data: {
          type: { set: [...chatDb.type, 'GRAYSCALE'] },
        },
      });
    } else {
      await prisma.chat.create({
        data: {
          chatId: String(ctx.chat.id),
          type: ['GRAYSCALE'],
        },
      });
    }
    ctx.reply("Done, from now on I'll keep you updated");
  }
});
