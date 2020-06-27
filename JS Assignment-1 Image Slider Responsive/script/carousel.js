const IMAGE_WIDTH = 600;
let currentIndex = 0;

class Carousel {
  constructor(container, wrapper) {
    var that = this;
    this.container = container;
    this.wrapper = wrapper;
    this.numberOfImages = this.wrapper.childElementCount;
    this.wrapper.style.width = this.numberOfImages * IMAGE_WIDTH + "px";
    this.wrapper.classList.add("clearfix");
    this.resetTransitionSpeed();

    this.width = parseInt(
      window.getComputedStyle(container).getPropertyValue("width")
    );
    this.height = parseInt(
      window.getComputedStyle(container).getPropertyValue("height")
    );

    this.currentIndex = 0;

    this.leftButton = this.createNavButton(0, this.height / 2, "&#9001;");
    this.leftButton.addEventListener("click", function () {
      that.slide(true, null);
    });

    this.rightButton = this.createNavButton(
      this.width - 13,
      this.height / 2,
      "&#9002;"
    );
    this.rightButton.addEventListener("click", function () {
      that.slide(false, null);
    });

    this.carouselButtonWrapper = this.createCarouselButtonWrapper();
    this.createCarouselButtons();
  }

  resetTransitionSpeed() {
    this.transitionSpeed = 35;
  }

  createCarouselButtons() {
    let that = this;
    for (let i = 0; i < this.numberOfImages; i++) {
      let element = document.createElement("button");
      element.id = i + "-carousel-button";
      element.style.width = 10 + "px";
      element.style.height = 10 + "px";
      element.style.borderRadius = 10 + "px";
      element.style.display = "inline-block";
      element.style.backgroundColor = "#D6EEFF";
      element.style.margin = 10 + "px";

      element.addEventListener("click", function () {
        // Get left property of carousel-image-wrapper
        let initialLeft = parseInt(
          window.getComputedStyle(that.wrapper).getPropertyValue("left")
        );
        let finalLeft = parseInt(element.id) * -IMAGE_WIDTH;
        that.slide(initialLeft < finalLeft, finalLeft);
      });
      this.carouselButtonWrapper.appendChild(element);
    }
  }

  createCarouselButtonWrapper() {
    let element = document.createElement("div");
    element.classList.add("carousel-button-wrapper");
    element.style.position = "absolute";
    element.style.top = this.height - 20 + "px";

    element.style.left = "50" + "%";
    element.style.transform = "translate(-50%, 0)";
    element.style.cursor = "pointer";
    this.container.appendChild(element);
    return element;
  }

  createNavButton(x, y, character) {
    let button = document.createElement("button");
    button.style.position = "absolute";
    button.style.left = x + "px";
    button.style.top = y + "px";
    button.style.position = "absolute";
    button.style.backgroundColor = "transparent";
    button.style.color = "#D6EEFF";
    button.style.outline = "none";
    button.style.border = "none";
    button.style.fontSize = 40 + "px";
    button.style.cursor = "pointer";
    button.innerHTML = character;
    this.container.appendChild(button);
    return button;
  }

  slide(isLeft, isFinalVal) {

    let that = this;
    let initialLeft = parseInt(
      window.getComputedStyle(this.wrapper).getPropertyValue("left")
    );
   
  initialLeft = -this.currentIndex * IMAGE_WIDTH;
    let finalLeft =
      isFinalVal ||
      (isLeft ? initialLeft + IMAGE_WIDTH : initialLeft - IMAGE_WIDTH);
    if (isFinalVal == 0) {
      finalLeft = 0;
    }
    this.currentIndex = -Math.ceil(finalLeft / IMAGE_WIDTH);

    // Transition to last when we click left on first slide
    // and to first slide when we click right on last slide 
    if (isLeft && this.currentIndex == -1) {
      finalLeft = -IMAGE_WIDTH * (this.numberOfImages - 1);
      this.transitionSpeed = Math.abs(initialLeft - finalLeft);
      this.currentIndex = (this.numberOfImages - 1)
    }
    
    if (!isLeft && this.currentIndex == this.numberOfImages) {
      finalLeft = 0;
      this.transitionSpeed = Math.abs(initialLeft - finalLeft);
      this.currentIndex = 0;
    }

    let wrapper = this.wrapper;
    let transitionSpeed = this.transitionSpeed;
    let previousLeft = initialLeft;
    var id = setInterval(function () {
      if (initialLeft == finalLeft) {
        // Color current button
        let currentButtonNum = Math.abs(finalLeft / IMAGE_WIDTH);
        let currentButton = document.getElementById(
          currentButtonNum + "-carousel-button"
        );
        if (currentButton) {
          currentButton.style.backgroundColor = "blue";
        }

        let previousButtonNum = Math.abs(previousLeft / IMAGE_WIDTH);
        let previousButton = document.getElementById(
          previousButtonNum + "-carousel-button"
        );
        if (previousButton) {
          previousButton.style.backgroundColor = "#D6EEFF";
        }
        that.resetTransitionSpeed();
        clearInterval(id);
      }
      if (isLeft) {
        if (initialLeft + transitionSpeed > finalLeft) {
            initialLeft = finalLeft;
            wrapper.style.left = finalLeft + 'px';
        } else {
          wrapper.style.left = (initialLeft += transitionSpeed) + "px";
        }
      } else {
        if (initialLeft - transitionSpeed < finalLeft) {
            initialLeft = finalLeft;
            wrapper.style.left = finalLeft + 'px';
        } else {
          wrapper.style.left = (initialLeft -= transitionSpeed) + "px";
        }
      }
    }, 1000 / 60);
  }
}