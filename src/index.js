const wa = require('@open-wa/wa-automate');

function start(client) {
  client.onMessage(async (message) => {
    if (message.body === 'Hi') {
      await client.sendText(message.from, '👋 Hello!');
    }
  });
}

wa.create({
  sessionId: 'WABOT',
  authTimeout: 60,
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: 'IDID',
  logConsole: false,
  popup: true,
  qrTimeout: 0,
}).then((client) => start(client));
