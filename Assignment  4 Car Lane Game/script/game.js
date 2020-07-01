class Game {
    constructor(container) {
        localStorage.setItem('highScore', '0');
        this.canvas = document.querySelector(container);
        this.init();

    }

    reset() {
        this.score = 0;
        this.previousScore = 0;
        this.tick = 0;
        this.speed = 1;

        this.player = new Car(true, this.carList, this.speed);
        this.isStartScreen = true;
        this.gameRunning = false;
        this.gameOver = false;

        this.carList = [];
        this.lineDashOffset = 0;
        this.laneSpeed = 5;
        this.generateDelay = 2000;
        this.missile = null;
        this.missileNum = 2;
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
            if (this.gameRunning && this.missileNum && e.keyCode == 32 && this.missile == null) {
                this.missile = new Missile(this.carList[0]);
                this.missileNum--;
            }

            // ESC key restart the game
            if (this.gameOver && e.keyCode == 27) {
                this.init();
                this.gameRunning = true;
                this.startGame();
            }
        });
    }

    clearCanvas(width = this.canvas.width, height = this.canvas.height) {
        this.ctx.clearRect(0, 0, width, height);
    }

    startGame() {
        this.carList.push(this.player);
        this.drawStartScreen();
    }

    generateCars() {
        let opponent = new Car(false, this.carList, this.speed); // Pass reference to carlist as we may need to remove element
        if (!opponent.overlapsWithAny(this.carList)) {
            if(!this.onSameLine()) this.carList.push(opponent);
        }
                
    }

    onSameLine(){
        
        let lastThree = this.carList.slice(-3);
        if(lastThree.length == 3){
            if(Math.abs(lastThree[0].y - lastThree[1].y) < CAR_HEIGHT && Math.abs(lastThree[1].y -lastThree[2].y) < CAR_HEIGHT){
                return true;
            }
            return lastThree[0].y == lastThree[1].y &&  lastThree[1].y == lastThree[2].y;

        }
       
    }

    updateScore() {
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
                if (this.missile) this.missile.draw(this.ctx);
                deletedCar = this.carList.splice(index, 1);
                this.clearCanvas(deletedCar.x, deletedCar.y, CAR_WIDTH, CAR_HEIGHT);
                this.missile = null;
                return;

            }
            if (deletedCar == null) car.draw(this.ctx);
        });

        if (this.missile) this.missile.draw(this.ctx);
    }

    drawLane() {
        let ctx = this.canvas.getContext('2d');;

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

    drawScoreBoard() {
        this.ctx.fillStyle = '#9E2A2B';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.fillText(
            'Score: ' + this.score, 40, 12
        )

        this.ctx.fillText(
            'Bullets ' + this.missileNum, CANVAS_WIDTH - 170, 12
        )
        // Update HighScore
        let highScore = Math.max(parseInt(localStorage.getItem('highScore')), this.score);
        localStorage.setItem('highScore', highScore);
        this.ctx.fillText(
            'High Score: ' + localStorage.getItem('highScore'), CANVAS_WIDTH - 60, 12
        )
    }

    render() {
        this.animationId = window.requestAnimationFrame(this.render.bind(this));
        if (!this.gameOver) {
            this.updateScore();
            if ((this.previousScore != this.score) && (this.score + 1) % 5 == 0) {
                this.previousScore = this.score;
                this.updateDifficulty();
            }
            this.clearCanvas();
            this.drawLane();
            this.drawCharacters();
            this.drawScoreBoard();

        } else {
            this.drawGameOverScreen();
        }
    }

    updateDifficulty() {
        this.speed++;
        for(let i = 0; i < this.carList.length; i++){
            this.carList[i].speed = this.speed;
        }
        this.lineDashOffset = 0;
        this.laneSpeed++;
        this.missileNum += 2; // Earn bullets for every update in difficulty
    }
}

game1 = new Game('canvas');
game1.startGame();

game2 = new Game('.multi');
game2.startGame();