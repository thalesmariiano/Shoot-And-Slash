
class Parallax {
	constructor(image, {velocity}){
		this.image = spriteConverter(image)
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

	draw(){
		this.parallax_positions.forEach(position => {
			buffer.drawImage(this.image, Math.floor(-camera.x)/this.velocity + position, 0, this.width, this.height)
		})
	}

	update(){
		const ratio = this.image.width / this.image.height
		const newHeight = innerHeight
		const newWidth = newHeight / ratio

		this.width = newWidth + 500
		this.height = newHeight

		this.generateParallax()
	}
}