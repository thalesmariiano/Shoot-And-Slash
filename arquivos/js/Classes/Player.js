
class Player extends Entity{
	constructor({color, imgSrc, position}){
		super({color, imgSrc, position})
		
		this.animateFinished = false
		this.coinNumbers = 0
		this.sprite_info = null
		this.inventory = [
			{
				item: null,
				isHolding: false
			},
			{
				item: null,
				isHolding: false,
			},
			{
				item: null,
				isHolding: false,
			}
		]
		//
		this.entityType = "Player"
	}

	animate(){
		if(this.animateFinished) return

		this.framesElapsed++
		if(this.framesElapsed % this.framesHold === 0){
			this.currentFrames++
			if(this.currentFrames >= this.spriteFrames){
				if(this.sprite_info.name == "death"){
					this.animateFinished = true
					this.isDead = true
					return
				}
				this.currentFrames = 0
			}
		}
		this.imgX = this.frameSizeX*this.currentFrames
	}

	switchSprite(spr){
		this.sprite_info = spr
		switch(spr.name){
			case "idle":
				this.imgSrc = spr.img
				this.spriteFrames = spr.frames
				break
			case "idle_left":
				this.imgSrc = spr.img
				this.spriteFrames = spr.frames
				break
			case "run":
				this.imgSrc = spr.img
				this.spriteFrames = spr.frames
				break
			case "run_left":
				this.imgSrc = spr.img
				this.spriteFrames = spr.frames
				break
			case "jump":
				this.imgSrc = spr.img
				this.spriteFrames = spr.frames
				this.currentFrames = 0
				break
			case "jump_left":
				this.imgSrc = spr.img
				this.spriteFrames = spr.frames
				this.currentFrames = 0
				break
			case "fall":
				this.imgSrc = spr.img
				this.spriteFrames = spr.frames
				this.currentFrames = 0
				break
			case "fall_left":
				this.imgSrc = spr.img
				this.spriteFrames = spr.frames
				this.currentFrames = 0
				break
			case "hit":
				this.imgSrc = spr.img
				this.spriteFrames = spr.frames
				this.currentFrames = 0
				break
			case "death":
				this.imgSrc = spr.img
				this.spriteFrames = spr.frames
				this.framesHold = 8
				break
		}
	}

	getInventory(index){
		return this.inventory[index]
	}

	getHoldingItem(){
		const slot = this.inventory.find(i => i.isHolding)
		if(slot){
			return slot.item
		}
	}

	receiveLife(life){
		this.health += life
		updateUI("healthbar", this.health)
	}

	takeHit(dmg){
		lockPlayerControls = true
		if(!this.isFalling){
			this.velocity.y = this.jump
			this.velocity.x -= this.speed
		}

		this.health += -dmg
		updateUI("healthbar", this.health)
	}

	update(){
		this.draw()
		this.animate()

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