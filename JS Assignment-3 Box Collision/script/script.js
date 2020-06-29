const DIRX = [ 0 ,  1 , 1 , 1 , 0 , -1 , -1 , -1];
const DIRY = [-1 , -1 , 0 , 1 , 1 ,  1 ,  0 , -1];


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
	}
    
	init() {
        let ballIndex = 0;
        while(ballIndex < this.totalNumberOfBalls){
            let radius = this.randomGenerator.getRandomInt(20, 8);
            let [x, y] = this.randomGenerator.getRandomCoordinateBall(radius);
            let ball = new Ball(x, y, radius, 5, this.randomGenerator.getRandomColor());
            if(!ball.doesCollide(this.ballList, ballIndex)){
                this.ballList.push(ball);
                ballIndex++;
            }	
        }		
    }
    
    draw(){
        let cx = this.canvas.getContext('2d');
        for(let i = 0; i < this.ballList.length; i++){
            let {x, y, radius, speed, color}  = this.ballList[i];
            if(!this.ballList[i].doesCollide(this.ballList, i)){
                cx.fillStyle = color;
                cx.beginPath();
                cx.arc(x, y, radius, 0, 360);
                cx.fill();
            }
        }
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

cv = new Canvas(1024, 480, 600, 'canvas')
cv.init();
cv.draw();

set = new Set();
set.add([1, 2]);
set.add([1, 2]);
