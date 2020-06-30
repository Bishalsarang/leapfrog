class Game{
    constructor(container) {
        this.canvas = document.querySelector(container);
        this.init();          
    }

    init(){
        let that = this;
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.canvas.style.padding = 0;
        this.canvas.style.margin = 'auto';
        this.canvas.style.display = 'inline-block';
        
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;

        this.isStartScreen = true;
        this.gameRunning = false;
        this.gameOver = false;

        this.carList = [];
        this.laneSpeed = 10;
        this.missile = null;

        window.addEventListener('keydown', (e) => {
            console.log('key press', this);
            if (this.gameRunning && (e.keyCode == 37 || e.keyCode == 39)) {
                // Check Collision detection
                // Left arrow
                if (e.keyCode == 37) {
                    console.log('left');
                    this.player.move(true);
                }
                // right arrow
                else if (e.keyCode == 39) {
                    // console.log('right');
                    this.player.move(false);
                }
            }
            if(this.isStartScreen && e.key === "Enter"){
                console.log("enter");
                this.isStartScreen = false;
                this.gameRunning = true;
                this.render();   
            }
            if(this.gameRunning && e.keyCode == 32){
                console.log("Space");
                this.missile = new Missile(this.carList[0]);
            }
        });
        
       
    }

    startGame(){
        this.player = new Car(true);
        this.carList.push(this.player);

        for(let i = 0; i < 3; i++){
            let opponent = new Car();
            this.carList.push(opponent);
        }

        this.drawStartScreen();

    }

    drawStartScreen(){
        let ctx = this.canvas.getContext('2d');
        ctx.fillStyle = '#6C8EAD';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx. textBaseline = 'middle';
        ctx.fillStyle = 'white';  
        ctx.fillText('CAR LANE RACE', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 5); 
        ctx.font = 'italic 24px Georgia';
        ctx.fillText('Instructions: ', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 3 ); 
        ctx.font = 'italic 13px Georgia';
        ctx.fillText('A: Use left and right arrow key to move left or right', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 3 + 24); 
        ctx.fillText('B: Press Space to fire the bullet', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 3 + 48); 
        ctx.font = 'bold 20px Arial';
        ctx.fillText('Press "Enter" to start the game', CANVAS_WIDTH / 2, CANVAS_HEIGHT  - 200); 
    
    }

    drawCharacters() {
        this.carList.forEach((car, index) => {
            car.draw(this.ctx);
            if (index != 0 && car.doesCollide(this.carList[0])) {
                console.log("collides");
                this.collidedX = car.x;
                this.collidedY = car.y;
                this.gameOver = true;
                // cancelAnimationFrame(this.animationId)
            }
            
        });
    
        if(this.missile) this.missile.draw(this.ctx);
    }

    drawLane() {
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.setLineDash([40]);
        ctx.lineDashOffset = -(this.laneSpeed += 5);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = LANE_SEPARATOR_WIDTH;
        ctx.beginPath();
        ctx.moveTo(106, 0);
        ctx.lineTo(106, this.canvas.height);
        ctx.stroke();
    
        ctx.beginPath();
        ctx.moveTo(217, 0);
        ctx.lineTo(217, this.canvas.height);
        ctx.stroke();
        
    }

    drawGameOverScreen(){
        let img = new Image();
        img.src = BOOM_IMG_PATH;
        this.ctx.drawImage(img, this.collidedX - CAR_WIDTH, this.collidedY - CAR_HEIGHT);

        img = new Image();
        img.src = GAME_OVER_IMG_PATH;
        this.ctx.drawImage(img, 0, 0);

        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx. textBaseline = 'middle';
        this.ctx.fillStyle = '#9E2A2B';  
        this.ctx.fillText('Your Score: ' + this.score, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 300); 
    }

    render(){
        this.animationId = window.requestAnimationFrame(this.render.bind(this));
        if(!this.gameOver){
            this.drawLane();
            this.drawCharacters();
        }
        else{
            this.drawGameOverScreen();
        }
        
    }
}



game1 = new Game('canvas');
game1.startGame();

// game2 = new Game('.multi');
// game2.startGame();


