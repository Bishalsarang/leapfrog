const FPS = 60;
function Carousel(container, wrapper, holdTime, transitionTime) {
	var that = this;
	this.objId = Carousel.counter++; // Keep track of how many instances are created

	this.init = function(){
		this.container = container;
		this.wrapper = wrapper;

		this.animationId = null;
		this.autoAnimationId = null;

		this.tick = 0; // tick variable to track FPS
		this.holdTime = holdTime || 3; // hold time in sec
		this.transitionTime = transitionTime || 1;

		this.currentIndex = 0;
		this.nextIndex = 0;

		this.numberOfImages = this.wrapper.childElementCount;
		this.wrapper.style.width = this.numberOfImages * this.imageWidth + 'px';
		this.wrapper.style.left = 0 + 'px';

		this.width = parseInt(
			window.getComputedStyle(container).getPropertyValue('width')
		);
		this.height = parseInt(
			window.getComputedStyle(container).getPropertyValue('height')
		);
	
		this.imageWidth = parseInt(
			window
				.getComputedStyle(document.querySelector('.carousel-item'))
				.getPropertyValue('width')
		);
		this.imageHeight = parseInt(
			window
				.getComputedStyle(document.querySelector('.carousel-item'))
				.getPropertyValue('height')
		);
	
	}

	this.addDefaultClass = function(){
		this.container.classList.add('carousel-container-props');
		this.wrapper.classList.add('clearfix');
		this.wrapper.classList.add('carousel-image-wrapper-props');
	}

	this.resetTransitionSpeed = function () {
		this.transitionSpeed = 15;
	};

	this.createNavButtons = function(){
		this.leftButton = new NavButton('left');
		this.container.appendChild(this.leftButton);
		this.leftButton.addEventListener('click', function () {
			that.nextIndex = (that.currentIndex - 1) % that.numberOfImages;
			if (that.nextIndex == -1) {
				that.nextIndex = that.numberOfImages - 1;
			}
	
			that.animationId = requestAnimationFrame(that.slide.bind(that));
		});
	
		this.rightButton = new NavButton('right');
		this.container.appendChild(this.rightButton);
		this.rightButton.addEventListener('click', function () {
			that.nextIndex = (that.currentIndex + 1) % that.numberOfImages;
			that.animationId = requestAnimationFrame(that.slide.bind(that));
		});
	}

	this.animate = function () {
		let initialLeft = parseInt(this.wrapper.style.left);
		let finalLeft = -this.nextIndex * this.imageWidth;

		// If we want to go to higher index keep adding negative transition speed;
		let sgn = this.nextIndex > this.currentIndex ? -1 : 1;

		let nextLeft =
			initialLeft + sgn * (this.imageWidth / FPS / this.transitionTime);

		for (let i = 0; i < this.numberOfImages; i++) {
			if (i != this.currentIndex) {
				let el = document.getElementById(
					i + '-carousel-btn-' + (this.objId + 1)
				);
				el.classList.remove('btn-active');
			}
		}
		// If currentIndex has changed
		if (this.currentIndex != Math.abs(Math.ceil(nextLeft / this.imageWidth))) {
			let el = document.getElementById(
				this.currentIndex + '-carousel-btn-' + (this.objId + 1)
			);
			el.classList.remove('btn-active');
			this.currentIndex = Math.abs(Math.ceil(nextLeft / this.imageWidth));

			el = document.getElementById(
				this.currentIndex + '-carousel-btn-' + (this.objId + 1)
			);
			el.classList.add('btn-active');
		}

		if (
			(sgn == -1 && nextLeft <= finalLeft) ||
			(sgn == 1 && nextLeft >= finalLeft)
		) {
			nextLeft = finalLeft;
			this.wrapper.style.left = nextLeft + 'px';
			this.currentIndex = this.nextIndex;
			cancelAnimationFrame(this.animationId);
			that.autoAnimationId = window.requestAnimationFrame(
				that.autoSlide.bind(that)
			);
		}
		this.wrapper.style.left = nextLeft + 'px';
	};

	this.slide = function () {
		cancelAnimationFrame(that.autoAnimationId);
		that.tick = 0;
		this.animationId = window.requestAnimationFrame(this.slide.bind(this));
		this.animate();
	};

	this.autoSlide = function (time) {
		that.tick++;
		if (that.tick % (FPS * this.holdTime) == 0) {
			this.rightButton.click();
			cancelAnimationFrame(that.autoAnimationId);
		}

		that.autoAnimationId = window.requestAnimationFrame(
			that.autoSlide.bind(that)
		);
	};

	this.init();
	this.resetTransitionSpeed();
	this.addDefaultClass();
	this.createNavButtons();
	this.carouselButtonWrapper = this.createIndicatorButtonWrapper();
	this.createIndicatorButtons();
	this.autoAnimationId = requestAnimationFrame(this.autoSlide.bind(this));
}

/*
	Track total number of instances
*/
Carousel.counter = 0;
function Button() {
	this.el = document.createElement('button');
	this.el.style.color = '#CCCCCC';
	this.el.style.outline = 'none';
	this.el.style.border = 'none';
	this.el.style.fontSize = 40 + 'px';
	this.el.style.cursor = 'pointer';

	return this.el;
}

function NavButton(dirn) {
	Button.call(this);
	character = dirn == 'left' ? '&#9001;' : '&#9002;';
	this.el.style.backgroundColor = 'transparent';
	this.el.style.position = 'absolute';
	this.el.innerHTML = character;
	this.el.classList.add('nav-' + dirn);

	return this.el;
}

function IndicatorButton(id, radius, margin) {
	Button.call(this);
	if (id == 0) {
		this.el.classList.add('btn-active');
	}
	this.el.id = id + '-carousel-btn-' + Carousel.counter;
	this.el.style.width = radius * 2 + 'px';
	this.el.style.height = radius * 2 + 'px';
	this.el.style.borderRadius = radius * 2 + 'px';
	this.el.style.display = 'inline-block';
	this.el.style.margin = margin + 'px';
	this.el.classList.add('indicator-btn');

	return this.el;
}



Carousel.prototype.createIndicatorButtons = function () {
	let that = this;
	for (let i = 0; i < this.numberOfImages; i++) {
		let indicatorButton = new IndicatorButton(i, 10, 10);
		indicatorButton.addEventListener('click', function (e) {
			let el = e.target;
			// Initally set active the first slide
			that.nextIndex = parseInt(el.id);
			that.animationId = requestAnimationFrame(that.slide.bind(that));
		});
		this.carouselButtonWrapper.appendChild(indicatorButton);
	}
};

Carousel.prototype.createIndicatorButtonWrapper = function () {
	let el = document.createElement('div');
	el.classList.add('carousel-button-wrapper');
	el.style.position = 'absolute';
	this.container.appendChild(el);

	return el;
};