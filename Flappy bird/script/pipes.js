class Pipe{
    constructor(height1, height2, dir, ctx, sprite){
        this.x = CANVAS_WIDTH - BIRD.width;
        this.y = 0;
        this.ctx = ctx;

        this.sprite = sprite;
        this.height1 = height1;
        this.height2 = height2;
    

    }

    draw(){
        console.log("jss");
        this.x--;
        this.ctx.drawImage(this.sprite, TOP_PIPE.sx, TOP_PIPE.sy, TOP_PIPE.width, TOP_PIPE.height , this.x, this.y, TOP_PIPE.width, this.height1);    
        this.ctx.drawImage(this.sprite, BOTTOM_PIPE.sx, BOTTOM_PIPE.sy, BOTTOM_PIPE.width, BOTTOM_PIPE.height , this.x, CANVAS_HEIGHT - 56 - this.height2, TOP_PIPE.width, this.height2);    
    }

}