class Bird{
    constructor(x, y, sprite, ctx){
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.sprite = sprite;
        this.width = BIRD.width * 3;
        this.height = BIRD.height * 3;

        this.upForce = 10;
        
    }

    draw(){
        this.ctx.drawImage(this.sprite, BIRD.sx, BIRD.sy, BIRD.width, BIRD.height , this.x, this.y, this.width, this.height);    
    }

    moveDown(){
        this.y += 1       ;
        this.draw();
    }

    moveUp(){
        this.y -= this.upForce;
        this.draw();
    }
}