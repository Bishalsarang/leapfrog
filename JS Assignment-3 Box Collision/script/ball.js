class Ball{
    constructor(x, y, radius, speed, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.color = color;
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