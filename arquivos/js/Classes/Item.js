
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
			this.entitySizeX = 35
			this.entitySizeY = 35
			this.itemType = itemType
			this.type = "Item"
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

		if(this.itemType == "soul"){
			this.position.y += this.velocity.y
			this.velocity.y += GRAVITY
		}
		
	}
}


