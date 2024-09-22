
class Camera {
	constructor(){
		this.position = {
			x: 0,
			y: 0
		}
		this.velocity = {
			x: 0,
			y: 0
		}
		this.displayWidth
		this.displayHeight
		this.entity
		this.lockInEntity = true
	}

	leftEdge(){return this.position.x + (this.displayWidth/3)}
	rightEdge(){return this.position.x + (this.displayWidth/3)}
	topEdge(){return this.position.y + (this.displayHeight/2)}
	bottomEdge(){return this.position.y + (this.displayHeight * 0.75)}

	appendIn(entityToFollow){
		this.entity = entityToFollow
	}

	moveLeft(){
		const entityLeft = this.entity.position.x - (this.displayWidth/3) 
		this.position.x = entityLeft
	}

	moveRight(){
		const entityRight = this.entity.position.x + this.entity.width - (this.displayWidth/3)
		this.position.x = entityRight
	}

	moveUp(){
		const entityUp = this.entity.position.y - (this.displayHeight/2)
		this.position.y = entityUp
	}

	moveDown(){
		const entityDown = this.entity.position.y + this.entity.height - (this.displayHeight * 0.75)
		this.position.y = entityDown
	}

	followEntity(){
		if(this.entity.position.x < this.leftEdge()){
			this.moveLeft()	
		}

		if(this.entity.position.x + this.entity.width > this.rightEdge()){
			this.moveRight()
		}

		if(this.entity.position.y < this.topEdge()){
			this.moveUp()
		}

		if(this.entity.position.y + this.entity.height > this.bottomEdge()){
			this.moveDown()
		}
	}

	update(){
		this.displayWidth = canvas.width
		this.displayHeight = canvas.height

		if(this.lockInEntity){
			this.followEntity()
		}

		if(this.position.x + this.displayWidth > mapSize){
			this.position.x = mapSize - this.displayWidth
		}

		if(this.position.x < 0){
			this.position.x = 0
		}

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
	}
}