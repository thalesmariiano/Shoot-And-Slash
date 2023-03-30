
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
	}
}

// class Item  {
// 	constructor({imgSrc, item_sprites, itemType, itemValue, position}){
// 		this.imgSrc = imgSrc
// 		this.item_sprites = item_sprites
// 		this.sprite = new Image()
// 		this.itemType = itemType
// 		this.position = position
// 		this.initial_position = {
// 			x: this.position.x,
// 			y: this.position.y
// 		}
// 		this.velocity = {
// 			x: 0,
// 			y: 0
// 		}
// 		this.width = 32
// 		this.height = 32
// 		//
// 		this.visible = true
// 		this.itemValue = 0
// 		this.isInInventory = false
// 		this.type = "Item"

// 		this.sprInfo = null
// 		this.imgX = 0
// 		this.imgY = 0
// 		this.frameSizeX = 0
// 		this.frameSizeY = 0
// 		this.currentFrames = 0
// 		this.spriteFrames = 0
// 		this.framesElapsed = 0
// 		this.framesHold = 5
// 		this.endAnimation = false
// 	}

// 	animation(){
// 		this.framesElapsed++
// 		if(this.framesElapsed % this.framesHold === 0){
// 			this.currentFrames++
// 			if(this.currentFrames >= this.spriteFrames){
// 				this.currentFrames = 0
// 			}
// 		}
// 		this.imgX = this.frameSizeX*this.currentFrames
// 	}

// 	switchSprite(){
// 		const spr = this.item_sprites.find(sprite => sprite.name == name)

// 		this.sprite = spr.image
// 		this.spriteFrames = spr.frames
// 		this.framesHold = spr.hold ? spr.hold : 5
// 		this.frameSizeX = this.sprite.width/this.spriteFrames
// 		this.frameSizeY = this.sprite.height
		
// 		if(spr != this.sprInfo) this.currentFrames = 0	
// 		this.sprInfo = spr
// 	}

// 	draw(){
// 		this.sprite.src = this.imgSrc
// 		ctx.drawImage(this.sprite, this.imgX, this.imgY, this.frameSizeX, this.frameSizeY, this.position.x - this.offest.x, this.position.y - this.offest.y)
// 	}

// 	update(){
// 		this.draw()
// 		this.animate()

// 		switch(this.itemType){
// 			case "Vida":
// 				this.itemValue = 30
// 				break
// 			case "Bomb":
// 				this.itemValue = 45
// 				break
// 			case "Coin":
// 				this.itemValue = 1
// 				break
// 		}
// 	}
// }