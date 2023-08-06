
class Player extends Entity {
	constructor({color, position}){
		super({color, position})
		
		this.souls = 0
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
		this.attDamage = 5
		this.attackSprite = 1
		this.sword = {
			width: 100,
			height: 50,
			position: {
				x: 0,
				y: 0
			}
		}
		this.attackSpeedMax = false
		this.dropLuck = 70
		this.entitySizeX = 400
		this.entitySizeY = 400
		//
		this.entityType = "Player"
	}

	animation(){

		if(this.sprInfo && this.attackSpeedMax && this.sprInfo.name == `attack_${this.attackSprite}_${this.direction.toLowerCase()}`){
			this.framesHold = 5
		}

		this.framesElapsed++
		if(this.framesElapsed % this.framesHold === 0){
			this.currentFrames++
			if(this.currentFrames >= this.spriteFrames){
				if(this.sprInfo.name == `death_${this.direction}`){
					this.endAnimation = true
					return
				}
				if(this.sprInfo.name == `attack_${this.attackSprite}_${this.direction}`){
					if(this.attackSprite == 1){
						this.attackSprite = 2
					}else{
						this.attackSprite = 1
					}
					this.isAttacking = false
				}
				if(this.sprInfo.name == `take_hit_${this.direction}`){
					this.receiveDamage = false
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
		if(this.currentFrames == 4 && this.sprInfo.name == `attack_${this.attackSprite}_${this.direction}`){

			enemys.forEach(enemy => {
				if(!enemy.isDead){
					const { side } = collide(this.sword, enemy)
					const sword_collide = side.top || side.bottom || side.left || side.right

					sword_collide ? enemy.takeHit(this.attDamage) : enemy.receiveDamage = false
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

	restart(){
		this.maxHealth = this.health = 100
		this.receiveLife(1000)
		this.isDead = false
		this.framesHold = 5
		this.framesElapsed = 0
		this.direction = "RIGHT"
		this.switchSprite("idle_right")
		this.endAnimation = false
		this.position.x = this.initial_position.x
		this.position.y = this.initial_position.y
		this.souls = 0
		this.dropLuck = 70
		this.speed = this.defaultSpeed
		this.attackSpeedMax = false
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