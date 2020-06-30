class Missile{
    constructor(x, y=PLAYER_START_Y){
        this.x = x;
        this.y = y - 20;
        this.speed = 2;
        this.img = new Image();
        this.img.src = MISSILE_IMG_PATH;
        
    }

    draw(){
        this.update();
        ctx.drawImage(this.img, this.x, this.y);
    }

    update(){
        this.y -= this.speed;
    }
}