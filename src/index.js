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
    const { isGroupMsg, isMedia, caption, from, sender, type, mimetype } =
      message;
    if (isGroupMsg) return;
    if (!isMedia) return;
    if (!caption.includes('stiker')) return;
    signale.info(from, sender.pushname, type, caption);
    if (mimetype) {
      const mediaData = await decryptMedia(message);
      if (type === 'video') {
        await client.sendMp4AsSticker(from, mediaData, null, stickerMetadata);
      } else {
        await client.sendImageAsSticker(
          from,
          `data:${mimetype};base64,${mediaData.toString('base64')}`,
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
