
class Player extends Entity {
	constructor({color, position}){
		super({color, position})
		
		this.coinNumbers = 0
		this.inventory = [
			{
				id: 1,
				item: null,
				isHolding: false
			},
			{
				id: 2,
				item: null,
				isHolding: false,
			},
			{
				id: 3,
				item: null,
				isHolding: false,
			}
		]
		this.offest = {
			x: 170,
			y: 143
		}
		this.entitySize = 400
		//
		this.entityType = "Player"
	}

	animation(){
		this.framesElapsed++
		if(this.framesElapsed % this.framesHold === 0){
			this.currentFrames++
			if(this.currentFrames >= this.spriteFrames){
				if(this.sprInfo.name == `death_${this.direction.toLowerCase()}`){
					this.endAnimation = true
					return
				}
				if(this.sprInfo.name == `attack_1_${this.direction.toLowerCase()}`){
					this.isAttacking = false
				}
				this.currentFrames = 0
			}
		}
		this.imgX = this.frameSizeX*this.currentFrames
	}

	getInventory(id){
		return this.inventory.find(i => i.id == id)
	}

	getHoldingItem(){
		return this.inventory.find(i => i.isHolding)
	}

	receiveLife(received_life){
		const life_lack = Math.abs(this.health - this.maxHealth)
		this.health += life_lack < received_life ? life_lack : received_life
		updateUI("healthbar", this.health)
	}

	takeHit(damage_taken){
		this.health -= damage_taken
		this.receiveDamage = true
		updateUI("healthbar", this.health)
	}

	update(){
		this.draw()
		if(!this.endAnimation) this.animation()

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		this.velocity.y += GRAVITY

		// this.position.x = Math.max(1, Math.min(canvas.width - this.width - 2, this.position.x))
	}
}