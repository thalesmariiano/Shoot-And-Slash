
class Item extends Sprite {
	constructor({color, position, itemType}){
		super({color, position})

		this.width = 32
		this.height = 32
		this.initial_position = {
			x: this.position.x,
			y: this.position.y
		}
		this.offest = {
			x: 0,
			y: 0
		}
		this.velocity = {
			x: 0,
			y: 0
		}
		this.spriteSizeX = 32
		this.spriteSizeY = 32
		this.type = "Item"
		this.itemType = itemType
		this.itemValue = 1
		this.hasGravity = false
	}

	update(){
		this.animation()
		this.switchSprite(this.itemType)

		if(this.hasGravity){
			this.position.y += this.velocity.y
			this.velocity.y += GRAVITY
		}
	}
}


