const SlackBots = require("slackbots");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const bot = new SlackBots({
  token: process.env.TOKEN,
  name: process.env.NAME,
  disconnect: false
});

// Start handler
bot.on("start", () => {
  const params = {
    icon_emoji: ":cat:"
  };

  bot.postMessageToChannel(
    "general",
    "Hello it's me AnalyticsRequestBot",
    params
  );
});
