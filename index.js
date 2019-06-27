const SlackBots = require("slackbots");
const { RTMClient } = require("@slack/rtm-api");
// When you wanna add more API stuffs
// const axios = require("axios");
const dotenv = require("dotenv");

const token = process.env.TOKEN;
const rtm = new RTMClient(token);

dotenv.config();

const bot = new SlackBots({
  token: process.env.TOKEN,
  name: process.env.NAME,
  disconnect: false
});

// set the toggle for reducing the annoyance
let hasSeen = false;

// Start handler
bot.on("start", () => {
  const params = {
    icon_emoji: ":chart_with_upwards_trend:"
  };

  bot.postMessageToChannel(
    "thegarage",
    "Greetings human it's me @analyticsbot",
    params
  );
});

// Common actions
function runHelp() {
  // well I guess you need help with the form, toggle it back on
  hasSeen = false;
  const params = {
    icon_emoji: ":question:"
  };

  bot.postMessageToChannel(
    "thegarage",
    `Type @analyticsbot with either 'analytics', 'digitalData', or 'dataLayer'`,
    params
  );
}

// Respond to data
function handleMessage(message) {
  const params = {
    icon_emoji: ":chart_with_upwards_trend:"
  };
  if (
    message.includes(" analytics") ||
    message.includes(" dataLayer") ||
    message.includes(" digitalData")
  ) {
    if (hasSeen === false) {
      bot.postMessageToChannel(
        "thegarage",
        "Have you tried the request form `http://bit.ly/LuluAnalyticsRequest`",
        params
      );
      // now you have seen the message, I will stop asking
      hasSeen = true;
    }
  } else if (message.includes(" help")) {
    runHelp();
  } else if (message.includes(" hello")) {
    bot.postMessageToChannel(
      "thegarage",
      "Greetings data interested human. Have you tried the 'help'?",
      params
    );
  }
}

// Message Handler
bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }
  handleMessage(data.text);
});

// Error Handler
// eslint-disable-next-line no-console
bot.on("error", err => console.log(err));
