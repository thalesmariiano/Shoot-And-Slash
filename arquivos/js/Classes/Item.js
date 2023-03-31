
class Item extends Entity {
	constructor({color, position, itemType}){
		super({color, position})

			this.width = 32
			this.height = 32
			this.offest ={
				x: 0,
				y: 0
			}
			this.itemValue = 0
			this.isInInventory = false
			this.entitySizeX = 35
			this.entitySizeY = 35
			this.itemType = itemType
			this.type = "Item"
	}

	animation(){
		this.framesElapsed++
		if(this.framesElapsed % this.framesHold === 0){
			this.currentFrames++
			if(this.currentFrames >= this.spriteFrames){
				this.currentFrames = 0
			}
		}
		this.imgX = this.frameSizeX*this.currentFrames
	}

	update(){
		this.draw()
		this.animation()
		this.switchSprite(this.itemType)

		switch(this.itemType){
			case "life":
				this.itemValue = 35
				break
			case "Bomb":
				this.itemValue = 45
				break
			case "Coin":
				this.itemValue = 1
				break
			
		}

		this.position.y += this.velocity.y
		this.velocity.y += GRAVITY
	}
}


