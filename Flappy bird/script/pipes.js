class Pipe{
    constructor(height1, height2, dir, ctx, sprite){
        this.x = CANVAS_WIDTH - BIRD.width;
        this.y1 = 0;
        
        this.ctx = ctx;
        this.width = TOP_PIPE.width;
        this.sprite = sprite;
        this.height1 = height1;
        this.height2 = height2;
        this.y2 = CANVAS_HEIGHT - 56 - this.height2;
        this.passed = false;
        this.done = false;
    }

    draw(){
        this.x--;
        if(this.x < 300 && !this.flagged){
            score++;
            this.flagged = true;
        }
        this.ctx.drawImage(this.sprite, TOP_PIPE.sx, TOP_PIPE.sy, TOP_PIPE.width, TOP_PIPE.height , this.x, this.y1, TOP_PIPE.width, this.height1);    
        this.ctx.drawImage(this.sprite, BOTTOM_PIPE.sx, BOTTOM_PIPE.sy, BOTTOM_PIPE.width, BOTTOM_PIPE.height , this.x, CANVAS_HEIGHT - 56 - this.height2, TOP_PIPE.width, this.height2);    
    }
    

}