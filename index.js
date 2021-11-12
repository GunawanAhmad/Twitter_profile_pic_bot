const cron = require("node-cron");
const Twit = require("twit");
const dotenv = require("dotenv");
dotenv.config();

// cron.schedule("* * * * * *", function () {
//   console.log("run every seccond");
// });

let client = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_KEY_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

client.get(
  "followers/ids",
  { screen_name: "gunawan10x" },
  function (err, data, response) {
    console.log(data);
  }
);
