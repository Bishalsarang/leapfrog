const IMAGE_WIDTH = 600;
let currentIndex = 0;

class Carousel {
    constructor(container, wrapper) {
        var that = this;
        this.container = container;
        this.wrapper = wrapper;
        this.numberOfImages = this.wrapper.childElementCount;
        this.wrapper.style.width = this.numberOfImages * IMAGE_WIDTH + 'px';
        this.wrapper.classList.add('clearfix');
        this.width = parseInt(
            window.getComputedStyle(container).getPropertyValue("width")
        );
        this.height = parseInt(
            window.getComputedStyle(container).getPropertyValue("height")
        );

        this.leftButton = this.createButton(0, this.height / 2, "<");
        this.leftButton.addEventListener("click", function () {
            that.slide(true);
        });

        this.rightButton = this.createButton(this.width - 22, this.height / 2, ">");
        this.rightButton.addEventListener("click", function () {
            that.slide(false);
        });
    }

    createButton(x, y, character) {
        let button = document.createElement("div");
        button.style.position = "absolute";
        button.style.left = x + "px";
        button.style.top = y + "px";
        button.style.position = "absolute";
        button.style.color = "#D6EEFF";
        button.style.fontSize = 40 + "px";
        button.style.cursor = "pointer";
        button.innerText = character;
        this.container.appendChild(button);
        return button;
    }

    slide(isLeft) {
        let initialLeft = parseInt(window.getComputedStyle(this.wrapper).getPropertyValue("left"));
        let finalLeft = isLeft ? initialLeft + IMAGE_WIDTH : initialLeft - IMAGE_WIDTH;
        let wrapper = this.wrapper;
        var id = setInterval(function () {
            if (initialLeft == finalLeft && finalLeft % IMAGE_WIDTH == 0) {
                clearInterval(id);
            }
            if (isLeft) {
                wrapper.style.left = (initialLeft++) + 'px';
            } else {
                wrapper.style.left = (initialLeft--) + 'px';
            }
        }, 8);
    }
}
