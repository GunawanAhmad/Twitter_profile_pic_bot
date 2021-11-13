const fs = require("fs");
const cron = require("node-cron");
const Twit = require("twit");
const dotenv = require("dotenv");
const { createCanvas, loadImage } = require("canvas");
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

// client.get(
//   "followers/ids",
//   { screen_name: "gunawan10x" },
//   function (err, data, response) {
//     console.log(data);
//   }
// );

const canvas = createCanvas(200, 200);
const ctx = canvas.getContext("2d");
const width = 200;
const height = 200;
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, width, height);
ctx.font = "30px sans-serif";
ctx.textAlign = "center";
ctx.fillStyle = "#000";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let date = new Date();
let day = date.getDate();
let month = monthNames[date.getMonth()];

drawText(day, 100, 80, 32, "sans-serif");
drawText(month, 100, 110, 32, "sans-serif");

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("./image.png", buffer);

function drawText(text, centerX, centerY, fontsize, fontface) {
  ctx.save();
  ctx.font = fontsize + "px " + fontface;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, centerX, centerY);
  ctx.restore();
}
