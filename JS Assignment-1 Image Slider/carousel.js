
const IMAGE_WIDTH = 200;
let imageWrapper = document.querySelector('.carousel-image-wrapper');
let currentIndex = 0;
let numberOfImages = imageWrapper.childElementCount;


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
