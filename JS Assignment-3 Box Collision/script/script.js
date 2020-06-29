class Canvas {
	constructor(width, height, totalNumberOfBalls, canvasContainer) {
        this.canvas = document.querySelector(canvasContainer);
        this.canvasWidth = width;
        this.canvasHeight = height;

		this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvas.style.border = "1px solid red";
        this.totalNumberOfBalls = totalNumberOfBalls;
        this.ballList = [];
	}

    getRandomCoordinates(){
        return [Math.ceil(Math.random() * this.canvasWidth), Math.ceil(Math.random() * this.canvasHeight)];
    }
    
	init() {
		for (let i = 0; i < this.totalNumberOfBalls; i++) {
            let [x, y] = this.getRandomCoordinates();
			let ball = new Ball(x, y, 5, 5, 'red');
			this.ballList.push(ball);
		}
    }
    
    draw(){
        let cx = this.canvas.getContext('2d');
        this.ballList.forEach(function(ball){
            let {x, y, radius, speed, color} = ball;
            cx.fillStyle = color;
            cx.beginPath();
            cx.arc(x, y, radius, 0, 360);
            cx.fill();
        })
        
    }
}


cv = new Canvas(300, 300, 10, 'canvas')
cv.init();
cv.draw();

