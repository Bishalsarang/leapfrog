class Ground{
    constructor(x, y, sprite, ctx){
        this.x = x;
        this.y = y;

        this.sx = GROUND.sx;
        this.sy = GROUND.sy;
        this.ctx = ctx;
        this.sprite = sprite;
    }
    draw(){
            this.ctx.drawImage(this.sprite, this.sx, this.sy, GROUND.width, GROUND.height , this.x, this.y, CANVAS_WIDTH, GROUND.height);    
        
    }
}