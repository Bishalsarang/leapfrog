

var i = 0;
class Canvas {
	constructor(width, height, totalNumberOfBalls, canvasContainer) {
        var that = this;
        this.canvas = document.querySelector(canvasContainer);
        this.canvasWidth = width;
        this.canvasHeight = height;

		this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvas.style.border = "1px solid red";
        this.totalNumberOfBalls = totalNumberOfBalls;
        this.ballList = [];
        this.randomGenerator = new RandomPropertiesGenerator(this.canvasWidth, this.canvasHeight); 

        this.i = 0;
	}
    
	init() {
        let ballIndex = 0;
        let radius = this.randomGenerator.getRandomInt(20, 8);
            let [x, y] = this.randomGenerator.getRandomCoordinateBall(radius);
            let ball = new Ball(100, 100, 5, 5, this.randomGenerator.getRandomColor(), 5);
            this.ballList.push(ball)

             ball = new Ball(300, 100, 5, 5, this.randomGenerator.getRandomColor(), 1);
            this.ballList.push(ball)

            // ball = new Ball(this.canvas.width - 10, 10, radius, 5, this.randomGenerator.getRandomColor(), this.randomGenerator.getRandomInt(7, 0));
            // this.ballList.push(ball)
        // while(ballIndex < this.totalNumberOfBalls){
        //     let radius = this.randomGenerator.getRandomInt(20, 8);
        //     let [x, y] = this.randomGenerator.getRandomCoordinateBall(radius);
        //     let ball = new Ball(x, y, radius, 5, this.randomGenerator.getRandomColor(), this.randomGenerator.getRandomInt(7, 0));
        //     if(!ball.doesCollide(this.ballList, ballIndex)){
        //         this.ballList.push(ball);
        //         ballIndex++;
        //     }	
        // }		
    }
    
    draw(){
        let cx = this.canvas.getContext('2d');
        
        
        cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ballList.forEach((ball, index) =>{
            let {x, y, radius, speed, color}  = ball;
            ball.move();
            cx.beginPath();
                cx.arc(x, y , radius, 0, 360);
                cx.fillStyle = color;
                cx.fill();
                cx.closePath();
            if(ball.isWallCollision(this.canvas.width, this.canvas.height)){
                ball.direction = (ball.direction + 4) % 8;
            }
            if(!ball.doesCollide(this.ballList, index)){
                
            }
            else{
                //Resolve COllision
                console.log("hshshs");
                // cancelAnimationFrame(this.animationId);
                
                ball.exchangeDirection(this.ballList[index]);
            }
           
        });
        window.requestAnimationFrame(this.draw.bind(this));
    }

    start(){
        this.animationId = window.requestAnimationFrame(this.draw.bind(this));
    }
    
}


class RandomPropertiesGenerator{
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    getRandomInt(maxm, minm=0){
        return Math.floor(Math.random() * (maxm - minm) + minm);

    }

    getRandomColor(){
        let r = this.getRandomInt(255), g = this.getRandomInt(255), b = this.getRandomInt(255);
        return `rgb(${r},${g},${b})`
    }

    getRandomCoordinateBall(radius){   
        let maxm = this.canvasWidth - 2 * radius;
        let minm = 2 * radius;
        let x = this.getRandomInt(maxm, minm);

        maxm =  this.canvasHeight - 2 * radius;
        let y = this.getRandomInt(maxm, minm)
        return [x , y];
    }
}

cv = new Canvas(1024, 480, 2, 'canvas')
cv.init();
cv.start();

