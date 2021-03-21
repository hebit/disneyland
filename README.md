# Disneyland  
> Note: It's just a funny POC, not a real project or anything with support and high levels of quality  

## Directory Structure
```
    package.json
    README.md
    src/
        services/ (SDK's instancies with initial configurarion)
            credentials.json
        bots/
            walle/
            eve/
            olaf/
            >edna/
            >stitch?(voice adjustment)/
            index.ts
    out/
        `{year}-{month}-{day}T{hour}:{minutes}`/
            script.md
            metada.json
            >video.mp4
            >audio.wav
            >thumbnail.jpeg
            >medias?(instagram posts)/
```

## Bots
Every bot has a disney animation characters name based on it own responsibility.  
> _Why?_   
> Why not?

### Wall-e 
<img src="https://www.marketplace.org/wp-content/uploads/2019/06/walle3.gif?w=500" width="440px" height="210px" alt="Wall-E">
This bot search for news, getting the articles links and it content with no sanitization (just the viewer content).

### Eve
<img src="https://im2.ezgif.com/tmp/ezgif-2-afd0ddcc4d40.gif?w=500" width="440px" height="195px" alt="Eve">
This bot add tags, rank and sumarize the articles

### Olaf
<img src="https://user-images.githubusercontent.com/47919195/111921136-a17a0c80-8a71-11eb-91ba-362e6ed0172f.gif" width="440px" height="210px" alt="Olaf">
This bot tells the story, i.e, organize and save the information (Markdown files, images, video, etc)



