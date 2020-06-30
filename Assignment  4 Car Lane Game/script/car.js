PLAYER_IMG_PATH = "images/resized-mini.png"

class Car{
    constructor(){
        this.x = 0;
        this.y = 0;
    }

    draw(){
        let img = new Image();
        img.src = PLAYER_IMG_PATH;
        img.style.width = '10' + 'px';
        ctx.drawImage(img, 140, 508);
        
    }
}