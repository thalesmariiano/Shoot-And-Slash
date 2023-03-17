
class Camera {
	constructor(){
		this.x = 0
		this.y = 0
		this.width
		this.height
		this.xcount = 0
	}

	leftEdge(){
		return this.x + (this.width/3)
	}

	rightEdge(){
		return this.x + (this.width/3)
	}
	topEdge(){
		return this.y + (this.height/2)
	}
	bottomEdge(){
		return this.y + (this.height * 0.75)
	}

	update(){
		this.width = canvas.width
		this.height = canvas.height

		if(player.position.x < this.leftEdge()){
			this.x = player.position.x - (this.width/3)
		}

		if(player.position.x + player.width > this.rightEdge()){
			this.x = player.position.x + player.width - (this.width/3)
		}
		if(player.position.y < this.topEdge()){
			this.y = player.position.y - (this.height/2)
		}

		if(player.position.y + player.height > this.bottomEdge()){
			this.y = player.position.y + player.height - (this.height * 0.75)
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