const cron = require('node-cron');
const { runCron } = require('./scraper');

cron.schedule('30 * * * *', () => {
  console.log('Running Cron...');
  runCron();
});
