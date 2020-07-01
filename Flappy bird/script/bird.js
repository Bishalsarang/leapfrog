class Bird{
    constructor(x, y, sprite, ctx){
        this.x = x;
        this.y = y;

        // For sprite coordinates
        this.sx = BIRD.sx;
        this.sy = BIRD.sy;
        this.i = 0;

        this.ctx = ctx;
        this.sprite = sprite;
        this.width = BIRD.width * 3;
        this.height = BIRD.height * 3;

        this.gravity = .2;
        this.upForce = 3;
        this.dy = 0;
        
    }

    draw(){
        this.ctx.drawImage(this.sprite, this.sx, this.sy, BIRD.width, BIRD.height , this.x, this.y, this.width, this.height);    
    }


    update(){
        this.draw(); 
        this.dy += this.gravity;
        this.y += this.dy;
               
    }

    moveUp(){
        this.dy = -this.upForce;
    }

    flap(){   
        // Change the frame to animate birds wings
        this.sy = BIRD.sy + ((this.i++) % 3) * 26;
    }
}