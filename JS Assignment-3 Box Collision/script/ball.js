const DIRX = [-1, -1, -1, 0, 1, 1, 1, 0];
const DIRY = [-1, 0, 1, -1, 1, 0, -1, 1];
class Ball {
	constructor(x, y, radius, speed, color, dx, dy) {
		this.x = x;
		this.y = y;
		this.dx = 1;
		this.dy = 1;
		this.radius = radius;
		this.speed = speed;
		this.color = color;
	}

	move() {
		this.x += this.dx * this.speed;
		this.y += this.dy * this.speed;
	}

	exchangeDirection(ball) {
		this.dx = -this.dx;
		this.dy = -this.dy;
		ball.dx = -ball.dx;
		ball.dy = -ball.dy;
	}

	isWallCollision(width, height) {
		if (this.x + this.radius >= width) {
			this.x = width - this.radius;
			this.dx = -this.dx;
		}
		if (this.x - this.radius <= 0) {
			this.x = this.radius;
			this.dx = -this.dx;
		}
		if (this.y - this.radius <= 0) {
			this.y = this.radius;
			this.dy = -this.dy;
		}
		if (this.y + this.radius > height) {
			this.y = height - this.radius;
			this.dy = -this.dy;
		}
		return (
			this.x + this.radius >= width ||
			this.x - this.radius <= 0 ||
			this.y + this.radius >= height ||
			this.y - this.radius <= 0
		);
	}

	isCollide(ball) {
		let dx = this.x - ball.x;
		let dy = this.y - ball.y;
		var distance = Math.sqrt(dx * dx + dy * dy);
		if (distance < this.radius + ball.radius) {
			return true;
		}

		return false;
	}

	doesCollide(ballList, index) {
		for (let i = 0; i < ballList.length; i++) {
			let {
				x,
				y,
				radius,
				speed,
				color
			} = ballList[i];
			if (i != index) {
				if (this.isCollide(ballList[i])) {
					return [true, ballList[i]];
				}
			}
		}

		return [false, null];
	}
}