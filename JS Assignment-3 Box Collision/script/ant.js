let canvas = document.querySelector('.world');
canvas.style.width = 500 + 'px';
canvas.style.height = 500 + 'px';
canvas.style.position = 'relative';

ANT_IMAGE_PATH = 'images/ant.png';
class Ant{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.el = document.createElement('img');
        this.el.src = ANT_IMAGE_PATH;
        this.el.style.width = 10 + 'px';
        this.el.style.height = 20 + 'px';

        this.el.style.left = x + 'px';
        this.el.style.top = y + 'px';
        this.el.style.position = 'relative';
        canvas.appendChild(this.el)
    }

    move(){
        // this.el.style.left = parseInt(window.getComputedStyle(this.el).getPropertyValue('left')) + 1 + 'px';
        window.requestAnimationFrame(this.move.bind(this));
    }
    
}

ant1 = new Ant(10, 10);
ant1.move();