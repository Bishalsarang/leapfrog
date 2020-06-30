let canvas = document.querySelector('.world');
const WIDTH = 400;
const HEIGHT = 400;

canvas.style.width = WIDTH + 'px';
canvas.style.height = HEIGHT + 'px';
canvas.style.position = 'relative';
canvas.style.border = '1px solid red';

ANT_IMAGE_PATH = 'images/ant.png';
const RADIUS = 7;
const ANT_WIDTH = RADIUS * 4;
const ANT_HEIGHT = RADIUS * 4;


var antList = [];
class Ant{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.dx = 1;
        this.dy = 1;
        this.speed = 1;
        this.el = document.createElement('img');
        this.el.src = ANT_IMAGE_PATH;
        this.radius = 10;
        this.el.style.width = ANT_WIDTH + 'px';
        this.el.style.height = ANT_HEIGHT + 'px';

        this.el.style.left = x + 'px';
        this.el.style.top = y + 'px';
        this.el.style.zIndex = '10';
        this.el.style.position = 'absolute';

        this.el.addEventListener('click',(e) => {
            
            this.el.src= "images/splash.png";
            this.remove();
        });
      
    }

    remove(){
        
        canvas.removeChild(this.el);
        antList = antList.filter((ant) =>{
            return ant != this;
        })

    }
    create(){
        canvas.appendChild(this.el)
    }

    stillCollide(ant){
        return (this.x < ant.x + ANT_WIDTH &&
            this.x + ANT_WIDTH > ant.x &&
            this.y < ant.y + ANT_HEIGHT &&
            this.y + ANT_HEIGHT > ant.y);
            

    }

    draw(){
        this.isWallCollision();
        let [collides, ant] = this.collidesWIth(antList);

        if(collides){
            this.dx = -this.dx;
            this.dy = -this.dy;

            ant.dx = -ant.dx;
            ant.dy = -ant.dy;
            
            this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
            
        }
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
        
    }

    move(){ 
        // this.el.style.left = parseInt(window.getComputedStyle(this.el).getPropertyValue('left')) + 1 + 'px';
         this.el.style.left = this.x + 'px';
         this.el.style.top = this.y + 'px';
    }
    

    isWallCollision(width, height) {
        if(this.x + ANT_WIDTH >= WIDTH ){
            this.x = WIDTH - ANT_WIDTH;
            this.dx = -this.dx;
        }
        if(this.x <= 0){
            this.x = ANT_WIDTH;
            this.dx = -this.dx;
        }
        if(this.y<= 0){
            this.y = ANT_HEIGHT;
            this.dy = -this.dy;
        }
        if(this.y + ANT_HEIGHT >= HEIGHT){
            this.y = HEIGHT - ANT_HEIGHT;
            this.dy = -this.dy;
        }
	}

    collidesWIth(antList){
        for(let i = 0; i < antList.length; i++){
            
            let ant = antList[i];
            if(ant != this){
               
                if(this.x < ant.x + ANT_WIDTH &&
                    this.x + ANT_WIDTH > ant.x &&
                    this.y < ant.y + ANT_HEIGHT &&
                    this.y + ANT_HEIGHT > ant.y){
                        return [true, ant];
                        
                    }
            }
        }
        
        return [false, null];
    }
}


function getRandomInt(maxm, minm = 0) {
    return Math.floor(Math.random() * (maxm - minm) + minm);
}

let numberOfAnts = 8;

function generateAnts(){
    for(let i = 0; i < numberOfAnts; i++){
        let x = getRandomInt(WIDTH - ANT_WIDTH, 0 + ANT_WIDTH);
        let y = getRandomInt(HEIGHT - ANT_HEIGHT, 0 + ANT_HEIGHT);
        ant = new Ant(x, y);
        if(!ant.collidesWIth(antList)[0]){
            antList.push(ant);   
         }   
         else{
             i--;
         }
         ant.create();
         }
         window.requestAnimationFrame(render);
    }

function render(){
    antList.forEach((ant, index) => {
       ant.draw();
       ant.move();
    });
    window.requestAnimationFrame(render);
}
generateAnts();
