# wabot
Just an whatsapp bot to create sticker from given image or video 

# setup
This should be run in docker with a command like this
```bash
docker run --shm-size=1gb
```
It uses alpine image so it must be light. Refer to this https://github.com/Zenika/alpine-chrome

# media caption
Send image or video with this caption to use

mode:
- circle
- keep scale
  
crop:
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