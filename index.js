const SlackBots = require("slackbots");
const { token, channel, request, name } = require("./config");
// When you wanna add more API stuffs
// const axios = require("axios");
const bot = new SlackBots({
  token,
  name,
  disconnect: false
});
// set the toggle for reducing the annoyance
let hasSeen = false;

// Start handler
bot.on("start", () => {
  const params = {
    icon_emoji: ":chart_with_upwards_trend:"
  };

  bot.postMessageToChannel(channel, `Greetings human it's me @${name}`, params);
});

// Common actions
function runHelp() {
  // well I guess you need help with the form, toggle it back on
  hasSeen = false;
  const params = {
    icon_emoji: ":question:"
  };

  bot.postMessageToChannel(
    channel,
    `Type @${name}'digitalData', 'analytics', or 'dataLayer'`,
    params
  );
}

// Respond to data
function handleMessage(message) {
  // Some fun emoji
  const params = {
    icon_emoji: ":chart_with_upwards_trend:"
  };
  // parse the message for text
  if (
    message.includes(" analytics") ||
    message.includes(" dataLayer") ||
    message.includes(" digitalData")
  ) {
    // only message if they haven't seen it before
    if (hasSeen === false) {
      bot.postMessageToChannel(
        channel,
        `Have you tried the request form ${request}`,
        params
      );
      // now you have seen the message, I will stop asking
      hasSeen = true;
    }
  } else if (message.includes(" help")) {
    runHelp();
  } else if (message.includes(" hello")) {
    bot.postMessageToChannel(
      channel,
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
