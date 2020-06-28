const IMAGE_WIDTH = 600;

function Carousel(container, wrapper) {
	var that = this;
	// Keep track of how many instances are created
	this.objId = Carousel.counter++;
	
	this.container = container;
	this.container.classList.add('carousel-container-props');
	this.wrapper = wrapper;
	this.numberOfImages = this.wrapper.childElementCount;
	this.wrapper.style.width = this.numberOfImages * IMAGE_WIDTH + 'px';
	this.wrapper.style.left = 0 + 'px';
	this.wrapper.classList.add('clearfix');
	this.wrapper.classList.add('carousel-image-wrapper-props');

	this.animationId = null;
	
	this.tick = 0;
	this.resetTransitionSpeed();

	this.width = parseInt(
		window.getComputedStyle(container).getPropertyValue('width')
	);
	this.height = parseInt(
		window.getComputedStyle(container).getPropertyValue('height')
	);

	this.currentIndex = 0;
	this.nextIndex = 0;
	this.currentPosition = -0;

	this.leftButton = new NavButton(0, this.height / 2, '&#9001;');
	this.container.appendChild(this.leftButton);
	this.leftButton.addEventListener('click', function () {
		
		that.nextIndex = (that.currentIndex - 1) % that.numberOfImages;
		if(that.nextIndex == -1){
			that.nextIndex = that.numberOfImages - 1;
		}
		
		that.animationId = requestAnimationFrame(that.slide.bind(that));
	});

	this.rightButton = new NavButton(this.width - 13, this.height / 2, '&#9002;');
	this.container.appendChild(this.rightButton);
	this.rightButton.addEventListener('click', function () {
		that.nextIndex = (that.currentIndex + 1) % that.numberOfImages;
		that.animationId = requestAnimationFrame(that.slide.bind(that));
	});

	this.carouselButtonWrapper = this.createIndicatorButtonWrapper();
	this.createIndicatorButtons();


	this.slide = function () {
		this.animationId = window.requestAnimationFrame(this.slide.bind(this));
		let initialLeft = parseInt(this.wrapper.style.left);
		let finalLeft = -this.nextIndex * IMAGE_WIDTH;
		// If we want to go to higher index keep adding negative transition speed;
		let sgn = this.nextIndex > this.currentIndex? -1: 1;
		
		let nextLeft = initialLeft + sgn * this.transitionSpeed;


		for(let i = 0; i < this.numberOfImages; i++){
			if(i != this.currentIndex){
				let el = document.getElementById(i + '-carousel-btn-' + (this.objId + 1));
				el.classList.remove('btn-active');
			}
		}
		// If currentIndex has changed
		if(this.currentIndex != Math.abs(Math.ceil(nextLeft / IMAGE_WIDTH))){
			let el = document.getElementById(this.currentIndex + '-carousel-btn-' + (this.objId + 1))
			console.log(this.currentIndex + '-carousel-btn-' + this.objId);
			el.classList.remove('btn-active');
			this.currentIndex = Math.abs(Math.ceil(nextLeft / IMAGE_WIDTH))

			el = document.getElementById(this.currentIndex + '-carousel-btn-' + (this.objId + 1))
			el.classList.add('btn-active');
		
		}
		
		if((sgn == - 1 && nextLeft <= finalLeft) || (sgn ==  1 &&  nextLeft >= finalLeft)){
			nextLeft = finalLeft
			this.wrapper.style.left = nextLeft + 'px';
			this.currentIndex = this.nextIndex;
			cancelAnimationFrame(this.animationId);
		}
		this.wrapper.style.left = nextLeft + 'px';
	}

	this.autoSlide = function(){
		window.requestAnimationFrame(this.autoSlide.bind(this));
	}
}

Carousel.counter = 0;
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
	if(id == 0){
		this.el.classList.add('btn-active');
	}
	this.el.id = id + '-carousel-btn-' + Carousel.counter;
	this.el.style.width = radius * 2 + 'px';
	this.el.style.height = radius * 2 + 'px';
	this.el.style.borderRadius = radius * 2 + 'px';
	this.el.style.display = 'inline-block';
	this.el.style.margin = margin + 'px';
	return this.el;
}

Carousel.prototype.resetTransitionSpeed = function () {
	this.transitionSpeed = 15;
};

Carousel.prototype.createIndicatorButtons = function () {
	let that = this;
	console.log(that);
	for (let i = 0; i < this.numberOfImages; i++) {
		let indicatorButton = new IndicatorButton(i, 5, 10);
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
	el.style.top = this.height - 20 + 'px';

	el.style.left = '50' + '%';
	el.style.transform = 'translate(-50%, 0)';
	el.style.cursor = 'pointer';
	this.container.appendChild(el);
	return el;
};

