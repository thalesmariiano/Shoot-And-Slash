
class Entity {
	constructor({color, position}){
		this.sprite = new Image()
		this.color = color
		this.position = position
		this.initial_position = {
			x: this.position.x,
			y: this.position.y
		}
		this.width = 55
		this.height = 100
		this.velocity = {
			x: 0, 
			y: 0
		}
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
		this.animateFinished = false
		this.offest = {
			x: 0,
			y: 0
		}
		this.entitySize = 0
		//
		this.isIdle = false
		this.isFalling = false
		this.isRunning = false
		this.isWalking = false
		this.isAttacking = false
		this.isDying = false
		this.isDead = false
		this.receiveDamage = false
		//
		this.health = 100
		this.maxHealth = 100
		this.defaultSpeed = 5
		this.speed = 5
		this.jump = -13
		//
		this.visible = true
		this.type = "Entity"
		this.direction = "RIGHT"
		this.entityType = null
	}

	setSprites(sprArray){
		this.entitySprites = sprArray
	}

	switchSprite(name){
		const spr = this.entitySprites.find(sprite => sprite.name == name)

		this.sprite = spr.image
		this.spriteFrames = spr.frames
		this.framesHold = spr.hold ? spr.hold : 5
		this.frameSizeX = this.sprite.width/this.spriteFrames
		this.frameSizeY = this.sprite.height
		
		if(spr != this.sprInfo) this.currentFrames = 0
		this.sprInfo = spr
	}

	draw(){
		ctx.drawImage(this.sprite, this.imgX, this.imgY, this.frameSizeX, this.frameSizeY, this.position.x - this.offest.x, this.position.y - this.offest.y, this.entitySize, this.entitySize)

		if(developerMode){
			ctx.strokeStyle = "black"
			ctx.strokeRect(this.position.x, this.position.y, this.width, this.height)
		}
			
		// ctx.fillStyle = this.color
		// ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
	}

	update(){
		this.draw()

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		this.velocity.y += GRAVITY

		// this.position.x = Math.max(1, Math.min(canvas.width - this.width - 2, this.position.x))
	}
}