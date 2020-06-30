class Missile{
    constructor(car){
        this.x = car.x + 15;
        this.y = PLAYER_START_Y - 20;
        this.speed = 2;
        this.currentLane = car.currentLane;
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

    doesCollide(car){
        return this.currentLane == car.currentLane && Math.abs(this.y - car.y) <   CAR_HEIGHT;
    }
}