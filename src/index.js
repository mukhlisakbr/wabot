const { create, decryptMedia } = require('@open-wa/wa-automate');
const signale = require('signale');

function start(client) {
  client.onMessage(async (message) => {
    const { isGroupMsg, isMedia, caption, from, sender, type, mimetype, body } =
      message;
    if (isGroupMsg) return;
    if (body === 'menu') {
      signale.info(from, sender.pushname, type, body);
      await client.sendText(
        from,
        `
        Send a picture or video you will get a sticker. Give a caption to use select mode or crop type (optional)

        Supported caption:
        - circle
        - keep scale
        - top  
        - right top  
        - right  
        - right bottom  
        - bottom  
        - left bottom  
        - left  
        - left top  
        - north  
        - northeast  
        - east  
        - southeast  
        - south  
        - southwest  
        - west  
        - northwest  
        - center  
        - centre  
        - entropy  
        - attention
      `
      );
    } else {
      if (!isMedia) return;
      signale.info(from, sender.pushname, type, caption);
      let stickerMetadata = {
        pack: 'bot stiker wa',
        author: '@wabot_id',
      };
      switch (caption) {
        case 'circle':
          stickerMetadata = { ...stickerMetadata, circle: true };
          break;
        case 'keep scale':
          stickerMetadata = { ...stickerMetadata, keepScale: true };
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
          stickerMetadata = {
            ...stickerMetadata,
            cropPosition: 'right bottom',
          };
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
        default:
          if (mimetype) {
            const mediaData = await decryptMedia(message);
            if (type === 'video') {
              await client.sendMp4AsSticker(
                from,
                mediaData,
                null,
                stickerMetadata
              );
            } else {
              await client.sendImageAsSticker(
                from,
                `data:${mimetype};base64,${mediaData.toString('base64')}`,
                stickerMetadata
              );
            }
          }
          break;
      }
    }
  });
}

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
