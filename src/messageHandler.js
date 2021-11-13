const signale = require('signale');
const { decryptMedia } = require('@open-wa/wa-automate');
const ua = require('universal-analytics');
const menu = require('./menu');
require('dotenv').config();

module.exports = async (client, message) => {
  const { isGroupMsg, isMedia, caption, from, sender, type, mimetype, body } =
    message;
  // throw group msg
  if (isGroupMsg) return;
  // init analytics
  const visitor = ua(process.env.UA, from, { strictCidFormat: false });
  // text
  if (body && body.toLowerCase() === 'menu') {
    visitor.event('message', 'send', 'menu').send();
    signale.info(from, sender.pushname, type, body);
    await client.sendText(from, menu);
  }
  // media
  if (isMedia) {
    visitor.event('message', 'send', 'media').send();
    signale.info(from, sender.pushname, type, caption);
    let stickerMetadata = {
      pack: 'bot stiker wa',
      author: '@wabot_id',
    };
    if (caption) {
      switch (caption.toLowerCase()) {
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
          break;
      }
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
  }
};
