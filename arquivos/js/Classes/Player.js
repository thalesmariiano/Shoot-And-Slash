
class Player extends Entity {
	constructor({color, position}){
		super({color, position})
		
		this.coinNumbers = 0
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
		this.offest = {
			x: 170,
			y: 143
		}
		this.entitySize = 400
		//
		this.entityType = "Player"
	}

	animate(){
		this.configAnimation()

		this.framesElapsed++
		if(this.framesElapsed % this.framesHold === 0){
			this.currentFrames++
			if(this.currentFrames >= this.spriteFrames){
				if(this.sprInfo.name == "death"){
					this.animateFinished = true
					return
				}
				this.currentFrames = 0
			}
		}
		this.imgX = this.frameSizeX*this.currentFrames
	}

	configAnimation(){
		if(this.sprInfo && this.sprInfo.name == "death") this.framesHold = 8
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
		this.health += -dmg
		updateUI("healthbar", this.health)
	}

	update(){
		this.draw()
		
		if(!this.animateFinished){
			this.animate()
		}

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		this.velocity.y += GRAVITY

		// this.position.x = Math.max(1, Math.min(canvas.width - this.width - 2, this.position.x))
	}
}