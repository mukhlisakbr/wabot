const { create } = require('@open-wa/wa-automate');
const signale = require('signale');
const messageHandler = require('./messageHandler');
require('dotenv').config();

const start = (client) => {
  client.onMessage((message) => messageHandler(client, message));
};

create({
  skipSessionSave: true,
  disableSpins: true,
  qrTimeout: 0,
  authTimeout: 0,
  cacheEnabled: false,
  killClientOnLogout: true,
  killProcessOnTimeout: true,
  killProcessOnBrowserClose: true,
  logConsoleErrors: true,
  pQueueDefault: { concurrency: 1 },
  restartOnCrash: start,
  chromiumArgs: [
    '--disable-dev-shm-usage',
    '--no-sandbox',
    '--disable-setuid-sandbox',
  ],
})
  .then((client) => start(client))
  .catch((err) => signale.error(err));
