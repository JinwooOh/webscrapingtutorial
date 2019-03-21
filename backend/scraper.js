const axios = require('axios');
const cheerio = require('cheerio');
const { db } = require('./db');

async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
  // return html;
}

async function getTwitterFollowers(html) {
  const $ = cheerio.load(html);
  const span = $('[data-nav="followers"] .ProfileNav-value');
  return span.data().count;
}

async function getInstaFollowers(html) {
  const $ = cheerio.load(html);
  const dataInString = $('script[type="application/ld+json"]').html();
  const pageObject = JSON.parse(dataInString);
  return parseInt(
    pageObject.mainEntityofPage.interactionStatistic.userInteractionCount
  );
}

async function getInstagramCount() {
  const html = await getHTML('https://instagram.com/jinwoooh');
  const count = await getInstaFollowers(html);
  return count;
}

async function getTwitterCount() {
  const html = await getHTML('http://twitter.com/sosur0414');
  const count = await getTwitterFollowers(html);
  return count;
}

async function runCron() {
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount(),
  ]);
  console.log(iCount, tCount);
  db.get('twitter')
    .push({
      date: Date.now(),
      count: tCount,
    })
    .write();

  db.get('instagram')
    .push({
      date: Date.now(),
      count: iCount,
    })
    .write();
  console.log('Done');
}

module.exports = {
  getHTML,
  getTwitterFollowers,
  getInstaFollowers,
  getInstagramCount,
  getTwitterCount,
  runCron,
};
