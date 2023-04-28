
class Parallax {
	constructor(image, velocity){
		this.image = image
		this.velocity = velocity
		this.width = 1000
		this.height = 700
		this.parallax_positions = []
	}

	generateParallax(){
		if(this.width*this.parallax_positions.length + Math.floor(-camera.x) < canvas.width){
			this.parallax_positions.push(this.width*this.parallax_positions.length)
		}
	}

	drawParallax(){
		this.parallax_positions.forEach(position => {
			ctx.drawImage(this.image, Math.floor(-camera.x)/this.velocity + position, 0, this.width, this.height)
		})
	}

	update(){
		this.generateParallax()
		this.drawParallax()
	}
}