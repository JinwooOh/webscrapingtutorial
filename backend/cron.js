const cron = require('node-cron');
const { runCron } = require('./scraper');

cron.schedule('* * * * *', () => {
  console.log('Running Cron...');
  runCron();
});
