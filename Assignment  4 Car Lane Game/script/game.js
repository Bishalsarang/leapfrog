class Game {
	constructor(container) {
		this.canvas = document.querySelector(container);
		this.init();
    }
    
    reset(){
        this.score = 0;
        this.tick = 0;
		this.isStartScreen = true;
		this.gameRunning = false;
		this.gameOver = false;

        this.carList = [];
        this.lineDashOffset = 0;
        this.laneSpeed = 5;
        this.generateDelay = 100 ;
		this.missile = null;
    }

	init() {
		let that = this;
		this.canvas.width = CANVAS_WIDTH;
		this.canvas.height = CANVAS_HEIGHT;
		this.canvas.style.padding = 0;
		this.canvas.style.margin = 'auto';
		this.canvas.style.marginTop = '20px';
		this.canvas.style.border = '20px solid grey';
		this.canvas.style.borderBottom = '40px solid grey';
		this.canvas.style.display = 'inline-block';
        this.canvas.style.borderRadius = '12px';
        this.canvas.tabIndex = '1'; // Make canvas clickable
		this.ctx = this.canvas.getContext('2d');
		
        this.reset();
        this.interval = setInterval(this.generateCars.bind(this), this.generateDelay)
		this.canvas.addEventListener('keydown', (e) => {
			if (this.gameRunning && (e.keyCode == 37 || e.keyCode == 39)) {
				// Left arrow
				if (e.keyCode == 37) {
					this.player.move(true);
				}
				// right arrow
				else if (e.keyCode == 39) {
					this.player.move(false);
				}
			}
			if (this.isStartScreen && e.key === 'Enter') {
				this.isStartScreen = false;
				this.gameRunning = true;
				this.render();
            }
            // Space Key Launches missile
			if (this.gameRunning && e.keyCode == 32) {
				this.missile = new Missile(this.carList[0]);
            }
            
            // ESC key restart the game
            if(this.gameOver && e.keyCode == 27){
                this.reset();
                this.startGame();
            }
		});
	}

    clearCanvas(width=this.canvas.width, height=this.canvas.height){
        this.ctx.clearRect(0, 0, width, height);
    }

	startGame() {
		this.player = new Car(true, this.carList);
		this.carList.push(this.player);
		this.drawStartScreen();
	}

    generateCars(){
        // console.log("length", this.carList.length);
        for (let i = 0; i < (4 - this.carList.length); i++) {
            let opponent = new Car(false, this.carList); // Pass reference to carlist as we may need to remove element
            if(!opponent.overlapsWithAny(this.carList)) this.carList.push(opponent);
		}
    }

    updateScore(){
       this.score = this.player.carPassed;
    }

	drawStartScreen() {
		let ctx = this.canvas.getContext('2d');
		ctx.fillStyle = '#6C8EAD';
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		ctx.font = 'bold 30px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = 'white';
		ctx.fillText('CAR LANE RACE', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 5);
		ctx.font = 'italic 24px Georgia';
		ctx.fillText('Instructions: ', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 3);
		ctx.font = 'italic 13px Georgia';
		ctx.fillText(
			'A: Use left and right arrow key to move left or right',
			CANVAS_WIDTH / 2,
			CANVAS_HEIGHT / 3 + 24
		);
		ctx.fillText(
			'B: Press Space to fire the bullet',
			CANVAS_WIDTH / 2,
			CANVAS_HEIGHT / 3 + 48
		);
		ctx.font = 'bold 20px Arial';
		ctx.fillText(
			'Press "Enter" to start the game',
			CANVAS_WIDTH / 2,
			CANVAS_HEIGHT - 200
		);
	}

	drawCharacters() {
		this.carList.forEach((car, index) => {
			let deletedCar = null;
			if (index != 0 && car.doesCollide(this.carList[0])) {
				this.collidedX = car.x;
				this.collidedY = car.y;
                this.gameOver = true;
                return;
			}
			if (!car.isPlayer && this.missile && this.missile.doesCollide(car)) {
				let img = new Image(); 
				img.src = EXPLOSION_IMG_PATH;
				this.ctx.drawImage(img, 100, 100);
				
                if (this.missile) this.missile.draw(this.ctx);
                deletedCar = this.carList.splice(index, 1);
                this.clearCanvas(deletedCar.x, deletedCar.y, CAR_WIDTH, CAR_HEIGHT);
                console.log('missile le xoyo', deletedCar);
                this.missile = null;
                return;
                
            }
              // console.log(deletedCar, "haha");
            if(deletedCar == null) car.draw(this.ctx);
		});

		if (this.missile) this.missile.draw(this.ctx);
	}

	drawLane() {
		let ctx = this.canvas.getContext('2d');
		
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		ctx.setLineDash([40]);
		ctx.lineDashOffset = -(this.lineDashOffset += this.laneSpeed);
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

	drawGameOverScreen() {
		let img = new Image();
		img.src = BOOM_IMG_PATH;
		this.ctx.drawImage(
			img,
			this.collidedX - CAR_WIDTH,
			this.collidedY - CAR_HEIGHT
		);

		img = new Image();
		img.src = GAME_OVER_IMG_PATH;
		this.ctx.drawImage(img, 0, 0);

		this.ctx.font = 'bold 24px Arial';
		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'middle';
		this.ctx.fillStyle = '#9E2A2B';
		this.ctx.fillText(
			'Your Score: ' + this.score,
			CANVAS_WIDTH / 2,
			CANVAS_HEIGHT - 340
        );

        this.ctx.font = 'bold 22px Arial';
        this.ctx.fillText(
			'Press ESC to restart the game',
			CANVAS_WIDTH / 2 + 5,
			CANVAS_HEIGHT - 300
        );

	}

	render() {
        this.animationId = window.requestAnimationFrame(this.render.bind(this));
		if (!this.gameOver) {  
            this.updateScore();
            if(this.score % 5 == 0){
                this.updateDifficulty();
            }
            this.clearCanvas();
			this.drawLane();
            this.drawCharacters();

		} else {
			this.drawGameOverScreen();
		}
    }
    
    updateDifficulty(){
        // this.lineDashOffset = 0;
        // // this.laneSpeed = 5;
        // this.laneSpeed += 7;
    }
}

game1 = new Game('canvas');
game1.startGame();

// game2 = new Game('.multi');
// game2.startGame();
