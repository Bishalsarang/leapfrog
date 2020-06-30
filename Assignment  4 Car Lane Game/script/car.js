const VALUE_X = [PLAYER_START_X - 116, PLAYER_START_X, PLAYER_START_X + 116];

class Car{
    constructor(isPlayer=false){
       
        this.isPlayer = isPlayer;
        this.x = 141;
        this.y = 508;
        this.speed = 2;
        this.currentLane = isPlayer ? 1: this.getRandomLane();
        if(!this.isPlayer){
            this.x = VALUE_X[this.currentLane];
            this.y = 0;
        }
        this.img = new Image();
        this.img.src = isPlayer ? PLAYER_IMG_PATH: OPPONENT_IMG_PATH;
    }

    getRandomLane() {
		return getRandomInt(3);
    }
    
    getRandomPosition(){

    }

    doesCollide(car){
       
        return this.currentLane == car.currentLane && Math.abs(this.y - car.y) < CAR_HEIGHT;
    }

    draw(){
        this.update();
        if(this.isPlayer){

        }
        else{

        }
        ctx.drawImage(this.img, this.x, this.y);
    }

    isInsideBoundaryWidth(x){
        return x >= 0 && x < CANVAS_WIDTH;
    }

    isValidLane(lane){
        return lane >= 0 && lane < 3;
    }

    isInsideBoundaryHeight(y){
        return y >= 0 && y < CANVAS_HEIGHT;
    }

    move(isLeft){
        if(this.isPlayer){
            let nextLane = 0;
            if(isLeft){
                nextLane = this.currentLane - 1; 
            }
            else{
                nextLane = this.currentLane + 1;
            }
            if(this.isValidLane(nextLane)){
                this.currentLane = nextLane;
                this.x = VALUE_X[this.currentLane]
            }
        }

    }

    update(){
        if(!this.isPlayer){
            this.y += this.speed;
            if(!this.isInsideBoundaryHeight(this.y)){
                this.y = 0;
                this.currentLane = this.getRandomLane();
                this.x = VALUE_X[this.currentLane];
            }
        }

    }
}