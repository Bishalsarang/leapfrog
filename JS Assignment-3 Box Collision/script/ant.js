let canvas = document.querySelector('.world');
const WIDTH = 600;
const HEIGHT = 600;

canvas.style.width = WIDTH + 'px';
canvas.style.height = WIDTH + 'px';
canvas.style.position = 'relative';

ANT_IMAGE_PATH = 'images/ant.png';
const ANT_WIDTH = 30;
const ANT_HEIGHT = 40;

class Ant{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.el = document.createElement('img');
        this.el.src = ANT_IMAGE_PATH;
        
        this.el.style.width = ANT_WIDTH + 'px';
        this.el.style.height = ANT_HEIGHT + 'px';

        this.el.style.left = x + 'px';
        this.el.style.top = y + 'px';
        this.el.style.position = 'relative';

        this.el.addEventListener('click',() => {
            this.el.src= "images/splash.png";
        });
      
    }

    create(){
        canvas.appendChild(this.el)
    }

    move(){
        // this.el.style.left = parseInt(window.getComputedStyle(this.el).getPropertyValue('left')) + 1 + 'px';
        window.requestAnimationFrame(this.move.bind(this));
    }
    

    isWallCollision(width, height) {
        if(this.x + this.radius >= width ){
            this.x = width - this.radius;
            this.dx = -this.dx;
        }
        if(this.x - this.radius <= 0){
            this.x = this.radius;
            this.dx = -this.dx;
        }
        if(this.y - this.radius <= 0){
            this.y = this.radius;
            this.dy = -this.dy;
        }
        if(this.y + this.radius > height){
            this.y = height - this.radius;
            this.dy = -this.dy;
        }
		return (
			this.x + this.radius >= width ||
			this.x - this.radius <= 0 ||
			this.y + this.radius >= height ||
			this.y - this.radius <= 0
		);
	}

    collidesWIth(antList){

        antList.forEach((ant, index) => {
            if(index != this){
                if(this.x < ant.x + ant.width &&
                    this.x + this.width > ant.x &&
                    this.y < ant.y + ant.height &&
                    this.y + this.height > ant.y){
                        return true;
                    }
            }

        });
        return false;
    }
}


function getRandomInt(maxm, minm = 0) {
    return Math.floor(Math.random() * (maxm - minm) + minm);
}

let numberOfAnts = 20;
antList = [];
function generateAnts(){
    for(let i = 0; i < numberOfAnts; i++){
        let x = getRandomInt(720 - ANT_WIDTH, 0 + ANT_WIDTH);
        let y = getRandomInt(480 - ANT_HEIGHT, 0 + ANT_HEIGHT);
        ant = new Ant(x, y);
        if(!ant.collidesWIth(antList)){
            antList.push(ant);   
         }   
         else{
             i--;
         }
         ant.create();
         }
        
    }





generateAnts();
// ant.move();