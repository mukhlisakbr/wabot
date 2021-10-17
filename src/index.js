const { create, decryptMedia } = require('@open-wa/wa-automate');
const signale = require('signale');
const path = require('path');

function start(client) {
  client.onMessage(async (message) => {
    const { isGroupMsg, isMedia, caption, from, sender, type, mimetype, body } =
      message;
    if (isGroupMsg) return;
    signale.info(from, sender.pushname, type, caption || body);
    if (body === 'menu') {
      await client.sendImage(
        from,
        path.resolve(__dirname, '../docs/example1.png')
      );
      return;
    }
    if (!isMedia) return;
    if (!caption) return;
    let stickerMetadata = {
      pack: 'bikin nya di',
      author: 'wabot.my.id',
    };
    switch (caption) {
      case 'circle':
        stickerMetadata = { ...stickerMetadata, circle: true };
        break;
      case 'top':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'top' };
        break;
      case 'right top':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'right top' };
        break;
      case 'right':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'right' };
        break;
      case 'right bottom':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'right bottom' };
        break;
      case 'bottom':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'bottom' };
        break;
      case 'left bottom':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'left bottom' };
        break;
      case 'left':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'left' };
        break;
      case 'left top':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'left top' };
        break;
      case 'north':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'north' };
        break;
      case 'northeast':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'northeast' };
        break;
      case 'east':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'east' };
        break;
      case 'southeast':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'southeast' };
        break;
      case 'south':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'south' };
        break;
      case 'southwest':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'southwest' };
        break;
      case 'west':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'west' };
        break;
      case 'northwest':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'northwest' };
        break;
      case 'center':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'center' };
        break;
      case 'centre':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'center' };
        break;
      case 'entropy':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'entropy' };
        break;
      case 'attention':
        stickerMetadata = { ...stickerMetadata, cropPosition: 'attention' };
        break;
      case 'keep scale':
        stickerMetadata = { ...stickerMetadata, keepScale: true };
        break;
      default:
        break;
    }
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
