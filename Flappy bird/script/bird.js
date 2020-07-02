class Bird {
	constructor(x, y, sprite, ctx, pipeList) {
		this.x = x;
		this.y = y;

		this.pipeList = pipeList;

		// For sprite coordinates
		this.sx = BIRD.sx;
		this.sy = BIRD.sy;
		this.i = 0;

		this.ctx = ctx;
		this.sprite = sprite;
		this.width = BIRD.width * 3;
		this.height = BIRD.height * 3;
		this.passed = 0;
		this.gravity = 0.2;
		this.upForce = 3;
		this.dy = 0;
	}

	draw() {
		this.ctx.drawImage(
			this.sprite,
			this.sx,
			this.sy,
			BIRD.width,
			BIRD.height,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}

	update() {
		this.draw();
		this.dy += this.gravity;
		this.y += this.dy;
	}

	moveUp() {
		this.dy = -this.upForce;
	}

	flap() {
		// Change the frame to animate birds wings
		this.sy = BIRD.sy + (this.i++ % 3) * 26;
	}

	checkPipeCollision() {
		for (let i = 0; i < this.pipeList.length; i++) {
			let p = this.pipeList[i];

			// Top pipe
			if (
				this.x < p.x + p.width &&
				this.x + this.width > p.x &&
				this.y < p.y1 + p.height1 &&
				this.y + this.height > p.y1
			) {
				return true;
			}

			if (
				this.x + this.width > p.x &&
				this.x < p.x + p.width &&
				(this.y < p.y1 + p.height ||
					this.y + this.height > p.y1 + p.height + 40)
			) {
				return true;
			}

			return false;
		}
	}
}
