const { create, decryptMedia } = require('@open-wa/wa-automate');
const signale = require('signale');
// const mime = require('mime-types');
// const fs = require('fs');

const stickerMetadata = {
  pack: 'bikin nya di',
  author: 'wabot.my.id',
};

function start(client) {
  client.onMessage(async (message) => {
    if (message.isGroupMsg) return;
    if (!message.isMedia) return;
    if (!message.caption.includes('stiker')) return;
    signale.info(
      message.from,
      message.sender.pushname,
      message.type,
      message.caption
    );
    if (message.mimetype) {
      const mediaData = await decryptMedia(message);
      if (message.type === 'video') {
        await client.sendMp4AsSticker(
          message.from,
          mediaData,
          null,
          stickerMetadata
        );
      } else {
        await client.sendImageAsSticker(
          message.from,
          `data:${message.mimetype};base64,${mediaData.toString('base64')}`,
          stickerMetadata
        );
      }
    }
  });
}

create({
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
