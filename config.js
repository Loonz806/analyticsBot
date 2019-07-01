const dotenv = require("dotenv");

const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;
console.log(envs);
module.exports = {
  token: process.env.TOKEN,
  name: process.env.NAME,
  request: process.env.REQUEST,
  channel: process.env.CHANNEL
};
