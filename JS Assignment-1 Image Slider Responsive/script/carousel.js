const IMAGE_WIDTH = 600;

function Carousel(container, wrapper) {
	var that = this;

	this.container = container;
	this.container.classList.add('carousel-container-props');
	this.wrapper = wrapper;
	this.numberOfImages = this.wrapper.childElementCount;
	this.wrapper.style.width = this.numberOfImages * IMAGE_WIDTH + 'px';
	this.wrapper.classList.add('clearfix');
	this.wrapper.classList.add('carousel-image-wrapper-props');
	this.resetTransitionSpeed();

	this.width = parseInt(
		window.getComputedStyle(container).getPropertyValue('width')
	);
	this.height = parseInt(
		window.getComputedStyle(container).getPropertyValue('height')
	);

	this.currentIndex = 0;

	this.leftButton = NavButton(0, this.height / 2, '&#9001;');
	this.container.appendChild(this.leftButton);
	this.leftButton.addEventListener('click', function () {
		that.slide(true, null);
	});

	this.rightButton = NavButton(this.width - 13, this.height / 2, '&#9002;');
	this.container.appendChild(this.rightButton);
	this.rightButton.addEventListener('click', function () {
		that.slide(false, null);
	});

	this.carouselButtonWrapper = this.createIndicatorButtonWrapper();
	this.createIndicatorButtons();
}

function Button() {
	this.el = document.createElement('button');
	// this.el.style.position = 'absolute';

	this.el.style.color = '#D6EEFF';
	this.el.style.outline = 'none';
	this.el.style.border = 'none';
	this.el.style.fontSize = 40 + 'px';
	this.el.style.cursor = 'pointer';
	return this.el;
}

function NavButton(x, y, character) {
	Button.call(this);
	this.el.style.left = x + 'px';
	this.el.style.backgroundColor = 'transparent';
	this.el.style.position = 'absolute';
	this.el.style.top = y + 'px';
	this.el.innerHTML = character;
	return this.el;
}

function IndicatorButton(id, radius, margin) {
	Button.call(this);
	this.el.id = id + '-carousel-button';
	this.el.style.width = radius * 2 + 'px';
	this.el.style.height = radius * 2 + 'px';
	this.el.style.borderRadius = radius * 2 + 'px';
	this.el.style.display = 'inline-block';
	this.el.style.margin = margin + 'px';
	return this.el;
}

Carousel.prototype.resetTransitionSpeed = function () {
	this.transitionSpeed = 35;
};

Carousel.prototype.createIndicatorButtons = function () {
	let that = this;
	for (let i = 0; i < this.numberOfImages; i++) {
		let indicatorButton = IndicatorButton(i, 5, 10);
		indicatorButton.addEventListener('click', function () {
			// Get left property of carousel-image-wrapper
			let initialLeft = parseInt(
				window.getComputedStyle(that.wrapper).getPropertyValue('left')
			);
			let finalLeft = parseInt(indicatorButton.id) * -IMAGE_WIDTH;
			that.slide(initialLeft < finalLeft, finalLeft);
		});
		this.carouselButtonWrapper.appendChild(indicatorButton);
	}
};

Carousel.prototype.createIndicatorButtonWrapper = function () {
	let el = document.createElement('div');
	el.classList.add('carousel-button-wrapper');
	el.style.position = 'absolute';
	el.style.top = this.height - 20 + 'px';

	el.style.left = '50' + '%';
	el.style.transform = 'translate(-50%, 0)';
	el.style.cursor = 'pointer';
	this.container.appendChild(el);
	return el;
};

Carousel.prototype.slide = function (isLeft, isFinalVal) {
	let that = this;
	let initialLeft = parseInt(
		window.getComputedStyle(this.wrapper).getPropertyValue('left')
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
		this.currentIndex = this.numberOfImages - 1;
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
		function colorButton(buttonNum, color) {
			let currentButton = document.getElementById(
				buttonNum + '-carousel-button'
			);
			if (currentButton) {
				currentButton.style.backgroundColor = color;
			}
		}
		// // Color current button

		let currentButtonNum = Math.round(Math.abs(initialLeft / IMAGE_WIDTH));
		colorButton(currentButtonNum, 'blue');
		let previousButtonNum = Math.abs(previousLeft / IMAGE_WIDTH);
		colorButton(previousButtonNum, '#D6EEFF');

		if (initialLeft == finalLeft) {
			for (let i = 0; i < that.numberOfImages; i++) {
				if (i != currentButtonNum) {
					colorButton(i, '#D6EEFF');
				} else {
					colorButton(i, 'blue');
				}
			}
			that.resetTransitionSpeed();
			clearInterval(id);
		}
		if (isLeft) {
			if (initialLeft + transitionSpeed > finalLeft) {
				initialLeft = finalLeft;
				wrapper.style.left = finalLeft + 'px';
			} else {
				wrapper.style.left = (initialLeft += transitionSpeed) + 'px';
			}
		} else {
			if (initialLeft - transitionSpeed < finalLeft) {
				initialLeft = finalLeft;
				wrapper.style.left = finalLeft + 'px';
			} else {
				wrapper.style.left = (initialLeft -= transitionSpeed) + 'px';
			}
		}
	}, 1000 / 60);
};
