

class Camera {
	constructor(width, height){
		this.x = 0
		this.y = 0
		this.width = width
		this.height = height
	}

	leftEdge(){
		return this.x + (this.width * 0.75)
	}

	rightEdge(){
		return this.x + (this.width * 0.75)
	}
	topEdge(){
		return this.y + (this.height * 0.25)
	}
	bottomEdge(){
		return this.y + (this.height * 0.75)
	}

	update(){
		if(player.position.x < this.leftEdge()){
			this.x = player.position.x - (this.width * 0.25)
		}

		if(player.position.x + player.width > this.rightEdge()){
			this.x = player.position.x + player.width - (this.width * 0.75)
		}

		if(player.position.y < this.topEdge()){
			this.y = player.position.y - (this.height * 0.25)
		}

		if(player.position.y + player.height > this.bottomEdge()){
			if(this.y < 250){
				this.y = player.position.y + player.height - (this.height * 0.75)
			}
		}

		// Limites da câmera
		if(this.x < 0){
			this.x = 0
		}

		if(this.x + this.width > mapSize){
			this.x = mapSize - this.width
		}
	}
}