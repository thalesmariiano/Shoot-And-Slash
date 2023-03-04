
class Entity {
	constructor({color, position}){
		this.sprite = new Image()
		this.color = color
		this.position = position
		this.width = 55
		this.height = 100
		this.velocity = {
			x: 0, 
			y: 0
		}
		this.sprites = null
		this.sprInfo = null
		this.imgX = 0
		this.imgY = 0
		this.frameSizeX = 0
		this.frameSizeY = 0
		this.currentFrames = 0
		this.spriteFrames = 8
		this.framesElapsed = 0
		this.framesHold = 5
		this.offest = {
			x: 170,
			y: 143
		}
		//
		this.isIdle = false
		this.isFalling = false
		this.isRunning = false
		this.isAttacking = false
		this.isDying = false
		this.isDead = false
		//
		this.health = 100
		this.maxHealth = 100
		this.defaultSpeed = 5
		this.speed = 5
		this.jump = -13
		//
		this.visible = true
		this.type = "Entity"
		this.entityType = null
	}

	setSprites(sprArray){
		this.sprites = sprArray
	}

	switchSprite(name){
		const spr = this.sprites.find(sprite => sprite.name == name)
		this.sprInfo = spr
		this.sprite.src = spr.image
		this.sprite.addEventListener("load", () => {
			this.spriteFrames = spr.frames
			this.frameSizeX = this.sprite.width/this.spriteFrames
			this.frameSizeY = this.sprite.height
		})
	}

	draw(){
		ctx.drawImage(this.sprite, this.imgX, this.imgY, this.frameSizeX, this.frameSizeY, this.position.x - this.offest.x, this.position.y - this.offest.y, 400, 400)

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
		

		// Caso o player caia da tela, teletransportar para fora
		if(this.position.y + (this.height - 200) > canvas.height){
			this.position.x = 10
			this.position.y = 10
		}

		// this.position.x = Math.max(1, Math.min(canvas.width - this.width - 2, this.position.x))
	}
}