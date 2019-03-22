const express = require('express');
const cors = require('cors');
const { getTwitterCount, getInstagramCount } = require('./scraper');
const { db } = require('./db');
const { uniqueCount } = require('./utill');
require('./cron');

const app = express();
app.use(cors());
app.get('/scrape', async (req, res, next) => {
  console.log('Scraping');
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount(),
  ]);
  res.json({ iCount, tCount });
});

app.get('/data', async (req, res, next) => {
  // get the scrape data
  const { instagram, twitter } = db.value();
  // filter for only unique values
  const uniTwitter = uniqueCount(twitter);
  const uniInstagram = uniqueCount(instagram);
  // respond with json
  res.json({ instagram: uniInstagram, twitter: uniTwitter });
});

app.listen(3333, () =>
  console.log(`Example App running on port http://localhost:3333`)
);
