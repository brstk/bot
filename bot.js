const { Telegraf } = require('telegraf');
require('dotenv').config();
const axios = require('axios');
const text = require('./const');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Привет, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'} ! Отправь свою геолокацию  `));
bot.help((ctx) => ctx.reply(text.commands));


bot.on('message', async (ctx) => {
  if (ctx.message.location) {
    console.log(ctx.message.location);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=64e8b2eddd6d3f2f1aa904a9d69cd915`;
    const response = await axios.get(url);
    console.log(response);
    ctx.reply(`${response.data.name} : ${Math.trunc(response.data.main.temp) - 273} C, скорость ветра: ${response.data.wind.speed} м/сек`);
  }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
