# wabot
Instantly run WhatsApp sticker maker bot on your docker with zero configuration.

# Setup
This should be run in docker with a command like this
```bash
docker run -d --restart always --name wabot -v /root/WABOT.data.json:/usr/src/app/WABOT.data.json ghcr.io/mukhlisakbr/wabot
```
It uses alpine image so it must be light. Map your existing session file into docker volume to avoid scan qr in production. 

# How to use
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

# Uses
* [wa-automate-nodejs](https://github.com/open-wa/wa-automate-nodejs)
* [alpine-chrome](https://github.com/Zenika/alpine-chrome)