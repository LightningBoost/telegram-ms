import { Scenes, Markup } from 'telegraf';
import { gql } from 'graphql-request';
import Currency from 'currency.js';
import dayjs from 'dayjs';
import grayscaleQuery from '../services/grayscale';
import { Graphql } from '../generated/grayscale/graphql';

const grayscaleScene = new Scenes.BaseScene<Scenes.SceneContext>('grayscale');

grayscaleScene.enter((ctx) =>
  ctx.reply(
    'You can choose a set of options to view',
    Markup.keyboard(['Holdings', 'Main menu']).resize()
  )
);

// commands

// get holdings
grayscaleScene.hears(/holdings/i, async (ctx) => {
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

export default grayscaleScene;
