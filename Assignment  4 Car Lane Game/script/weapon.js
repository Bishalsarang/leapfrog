class Missile{
    constructor(car){
        this.x = car.x + 15;
        this.y = PLAYER_START_Y - 20;
        this.speed = 2;
        this.img = new Image();
        this.img.src = MISSILE_IMG_PATH;
        
    }

    draw(ctx){
        this.update();
        ctx.drawImage(this.img, this.x, this.y);
    }

    update(){
        this.y -= this.speed;
    }

    hits(){

    }
}