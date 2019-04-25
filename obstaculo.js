class obstaculo{

	constructor(img, x, y, w, h,size){
		this.img   = img
		this.x     = x
		this.y     = y
		this.w     = w
		this.h     = h
		this.speed = -2
		this.size = size
		this.screen = true
	}
	draw() {
		image(this.img, this.x, this.y, this.w, this.h)
	}

	update(speed) {
	this.screen = (this.x > -this.size)
	this.x -= speed
	}


	hit(dino) {
		var halfSize = this.size * .5
		var distancia = halfSize + (dino.w - 11) 
		var xCenter = this.x + halfSize
		var yCenter = this.y + halfSize
		var distance = dist(xCenter, yCenter, dino.x, dino.y) 
		return (distance < distancia) 
	}
}