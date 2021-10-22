const { create } = require('@open-wa/wa-automate');
const signale = require('signale');
const messageHandler = require('./messageHandler');

const start = (client) => {
  client.onMessage((message) => messageHandler(client, message));
};

create({
  sessionId: 'WABOT',
  disableSpins: true,
  qrTimeout: 0,
  authTimeout: 60,
  cacheEnabled: false,
  killClientOnLogout: true,
  killProcessOnTimeout: true,
  killProcessOnBrowserClose: true,
  logConsoleErrors: true,
  pQueueDefault: { concurrency: 2 },
  restartOnCrash: start,
})
  .then((client) => start(client))
  .catch((err) => signale.error(err));
