const DIRX = [ -1, -1, -1, 0, 1, 1, 1, 0];
const DIRY = [-1, 0, 1, -1, 1, 0, -1, 1];
class Ball{
    constructor(x, y, radius, speed, color, direction) {
        this.x = x;
        this.y = y;
        this.dx = 1;
        this.dy = 1;
        this.radius = radius;
        this.speed = 1;
        this.color = color;
        this.direction = direction;
    }
    

    move(){
        this.x += DIRX[this.direction] * this.speed;
        this.y +=  DIRY[this.direction] * this.speed;
    }

    exchangeDirection(ball){
        console.log("Previous")
        console.log(this);
        console.log(ball);
        let temp = this.direction;
        this.direction = ball.direction;
        ball.direction = temp;
        console.log("After")
        console.log(this);
        console.log(ball);
    }

    isWallCollision(width, height){
        return this.x + this.radius >= width ||   this.x - this.radius <= 0 || this.y + this.radius >= height ||   this.y - this.radius <= 0
    }

    isCollide(ball){  
        let dx = this.x - ball.x;
        let dy = this.y - ball.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.radius + ball.radius) {
            return true;
        }
       
        return false;
    }

    doesCollide(ballList, index){
        for(let i = 0; i < ballList.length; i++){
            let {x, y, radius, speed, color}  = ballList[i];
            if(i != index){
                if(this.isCollide(ballList[i])){
                    return true;
                }
            }
        }
        
        return false;
    }
}