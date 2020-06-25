
const IMAGE_WIDTH = 200;
let imageWrapper = document.querySelector('.carousel-image-wrapper');
let currentIndex = 0;
let numberOfImages = imageWrapper.childElementCount;


class Carousel{
    constructor(container) {
        // var that = this;
        this.container = container;
        this.width = parseInt(window.getComputedStyle(container).getPropertyValue('width'));
        this.height =  parseInt(window.getComputedStyle(container).getPropertyValue('height'));

        this.leftButton = this.createButton(0, this.height / 2, '<');
        this.rightButton = this.createButton(this.width - 22, this.height / 2, '>');   
    }

    createButton(x, y, character){
        var button = document.createElement('div');
        button.style.position = 'absolute';
        button.style.left = x + 'px';
        button.style.top = y + 'px';
        button.style.position = 'absolute';
        button.style.color = '#D6EEFF';
        button.style.fontSize = 40 + 'px';
        button.innerText = character;
        this.container.appendChild(button);
        return button;
    }
}

function slide(isLeft){
 
    let x = IMAGE_WIDTH;
    let sign = -1;
    window.requestAnimationFrame(step);
    if(isLeft){
        currentIndex--;
        if(currentIndex == -1){
            currentIndex = numberOfImages - 1;
        }
    }
    else{
        currentIndex++;
        if(currentIndex == numberOfImages){
            currentIndex = 0;
        }
        // sign = -1;
    }
    imageWrapper.style.left = (currentIndex * sign * IMAGE_WIDTH) + 'px';

    function step(){
        window.requestAnimationFrame(step);
      } 
      
     
     
}
