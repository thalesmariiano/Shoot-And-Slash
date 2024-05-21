class Sprite {
	constructor({color, position}){
		this.sprite = new Image()
		this.color = color
		this.position = position
		this.width = 55
		this.height = 100
		this.entitySprites = null
		this.sprInfo = null
		this.imgX = 0
		this.imgY = 0
		this.frameSizeX = 0
		this.frameSizeY = 0
		this.currentFrames = 0
		this.spriteFrames = 0
		this.framesElapsed = 0
		this.framesHold = 5
		this.stopAnimation = false
		this.offest = {
			x: 0,
			y: 0
		}
		this.spriteSizeX = 0
		this.spriteSizeY = 0
		//
		this.visible = true
		this.direction = "right"
	}

	setSprites(sprArray){
		this.entitySprites = sprArray
	}

	switchSprite(name){
		const spr = this.entitySprites.find(sprite => sprite.name == name)

		if(spr !== this.sprInfo) this.currentFrames = 0	
		else return

		this.sprite = spr.image
		this.spriteFrames = spr.frames
		this.framesHold = spr.hold ? spr.hold : 5
		this.frameSizeX = this.sprite.width/this.spriteFrames
		this.frameSizeY = this.sprite.height
		this.sprInfo = spr
	}

	animation(){
		this.framesElapsed++
		if(this.framesElapsed % this.framesHold === 0){
			this.currentFrames++
			this.onAnimation({sprite: this.sprInfo, frame: this.currentFrames, frameHold: this.framesHold, framesElapsed: this.framesElapsed})
			if(this.currentFrames >= this.spriteFrames){					
				this.onAnimationEnd(this.sprInfo)
				if(this.stopAnimation) return
				this.currentFrames = 0
			}
		}
		this.imgX = this.frameSizeX*this.currentFrames
	}

	onAnimationEnd(){}
	onAnimation(){}

	draw(){
		buffer.drawImage(
			this.sprite, 
			this.imgX, 
			this.imgY, 
			this.frameSizeX, 
			this.frameSizeY, 
			this.position.x - this.offest.x, 
			this.position.y - this.offest.y, 
			this.spriteSizeX, 
			this.spriteSizeY
		)
	}

	update(){
		this.draw()
		this.animation()
	}
}