const VALUE_X = [PLAYER_START_X - 116, PLAYER_START_X, PLAYER_START_X + 116];

class Car{
    constructor(isPlayer=false, carList){ 
        this.isPlayer = isPlayer;
        this.x = 141;
        this.y = 508;
        this.carList = carList;
        this.speed = 2;
        this.carPassed = 0;
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
        return this.currentLane == car.currentLane && Math.abs(this.y - car.y) <=   CAR_HEIGHT;
    }

    draw(ctx){
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
                this.carList[0].carPassed++; // Update Player Score
                this.carList.splice(this.carList.indexOf(this), 1); // Remove from carList if the car is outside viewport
            }
        }
    }


    overlapsWithAny(carList){
        for(let i = 0; i < carList.length; i++){
            let car = carList[i];
            if(car != this){
                if(this.doesCollide(car)){
                    return true;
                }
            }
        }
        return false;
    }
}