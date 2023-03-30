
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
		this.attack = 1
		this.sword = {
			width: 100,
			height: 50,
			position: {
				x: 0,
				y: 0
			}
		}
		this.attack_timer = 0
		this.entitySizeX = 400
		this.entitySizeY = 400
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
				if(this.sprInfo.name == `attack_${this.attack}_${this.direction.toLowerCase()}`){
					if(this.attack == 1){
						this.attack = 2
					}else{
						this.attack = 1
					}
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

	swordAttack(){
		if(this.currentFrames == 4 && this.sprInfo.name == `attack_${this.attack}_${this.direction.toLowerCase()}`){

			enemys.forEach(enemy => {
				if(!enemy.isDead){
					const { side } = collide(this.sword, enemy)
					const sword_collide = side.top || side.bottom || side.left || side.right

					sword_collide ? enemy.takeHit(5) : enemy.receiveDamage = false
				}
			})

			if(this.direction == "RIGHT") this.sword.position.x = this.position.x + 110
			else if(this.direction == "LEFT") this.sword.position.x = this.position.x - 150

			this.sword.position.y = this.position.y + 15

			// ctx.fillStyle = "red"
			// ctx.fillRect(this.sword.position.x, this.sword.position.y, this.sword.width, this.sword.height)
		}
	}

	takeHit(damage_taken){
		this.health -= damage_taken
		this.receiveDamage = true
		updateUI("healthbar", this.health)
	}

	update(){
		this.draw()
		if(!this.endAnimation) this.animation()
		this.swordAttack()

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		this.velocity.y += GRAVITY

		// this.position.x = Math.max(1, Math.min(canvas.width - this.width - 2, this.position.x))
	}
}