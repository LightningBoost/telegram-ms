import { Scenes, Markup } from 'telegraf';
import { gql } from 'graphql-request';
import Currency from 'currency.js';
import dayjs from 'dayjs';
import grayscaleQuery from '../services/grayscale';
import { Grayscale } from '../generated/grayscale';

const { leave } = Scenes.Stage;

const grayscaleScene = new Scenes.BaseScene<Scenes.SceneContext>('grayscale');

grayscaleScene.enter((ctx) =>
  ctx.reply(
    'You can choose a set of options to view',
    Markup.keyboard(['Holdings']).oneTime().resize()
  )
);
grayscaleScene.leave((ctx) => ctx.reply('Returning to main menu'));

grayscaleScene.hears(/Main menu/i, leave<Scenes.SceneContext>());

// commands
grayscaleScene.hears(/holdings/i, async (ctx) => {
  const query = gql`
    query {
      getLatestPurchase {
        date
        total
      }
    }
  `;
  ctx.reply("I'm checking the latest acquisition...");
  const data: { getLatestPurchase: Grayscale } = await grayscaleQuery.request(
    query
  );
  const {
    getLatestPurchase: { date, total },
  } = data;
  ctx.reply(
    `Grayscale holds on ${dayjs(date).format(
      'MM/DD/YYYY'
    )} approximately ${Currency(total, { symbol: '' }).format()} bitcoins`
  );
});

export default grayscaleScene;
