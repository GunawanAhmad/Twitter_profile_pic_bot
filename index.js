const fs = require("fs");
const Twit = require("twit");
const dotenv = require("dotenv");
const { createCanvas, registerFont } = require("canvas");
registerFont("Righteous-Regular.ttf", { family: "Righteous" });
dotenv.config();

const client = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_KEY_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

function createImage() {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");
  const width = 200;
  const height = 200;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);

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
  let date = getTimezonDate(7);
  let day = date.getDate();
  let month = monthNames[date.getMonth()];

  drawText(ctx, day, 100, 80, 32, "Righteous");
  drawText(ctx, month, 100, 110, 32, "Righteous");

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync("./image.png", buffer);
}

function getTimezonDate(offset) {
  let date = new Date();
  let utc = date.getTime() + date.getTimezoneOffset() * 60000;
  let new_date = new Date(utc + 3600000 * offset);
  return new_date;
}

function drawText(ctx, text, centerX, centerY, fontsize, fontface) {
  ctx.save();
  ctx.fillStyle = "#000";
  ctx.font = fontsize + "px " + fontface;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, centerX, centerY);
  ctx.restore();
}

function postImgToTwitterAPI(img) {
  client.post("account/update_profile_image", { image: img }, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Done");
  });
}

function changeTwitterPictureTask() {
  createImage();
  let image64str = fs.readFileSync("image.png", { encoding: "base64" });
  postImgToTwitterAPI(image64str);
}

const app = require("express")();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  changeTwitterPictureTask();
  res.send("Hello");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("server is running");
});
