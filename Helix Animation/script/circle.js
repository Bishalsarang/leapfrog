class Circle{
    constructor(x, y, radius, ctx, color='#FEA67B'){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.ctx = ctx;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 360, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

}