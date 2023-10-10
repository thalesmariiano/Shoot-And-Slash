
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
		this.attDamage = 15
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

					if(sword_collide && !this.entityAttacked){
						this.entityAttacked = true
						enemy.takeHit(this.attDamage)
						skeleton_hit_sound.play()
					}else{
						enemy.receiveDamage = false
					}
				}
			})

			if(this.direction == "right") this.sword.position.x = this.position.x + 110
			else if(this.direction == "left") this.sword.position.x = this.position.x - 150

			this.sword.position.y = this.position.y + 15

			// ctx.fillStyle = "red"
			// ctx.fillRect(this.sword.position.x, this.sword.position.y, this.sword.width, this.sword.height)
		}else{
			this.entityAttacked = false
		}
	}

	takeHit(damage_taken){
		this.health -= damage_taken
		this.receiveDamage = true
		updateUI("healthbar", this.health)
	}

	onAnimationEnd(animation){
		if(animation.name == `attack_1_${this.direction}`){
			this.attackSprite = 2
		}else if(animation.name == `attack_2_${this.direction}`){
			this.attackSprite = 1
		}
		this.isAttacking = false

		if(animation.name == `death_${this.direction}`){
			this.stopAnimation = true
		}

		if(animation.name == `take_hit_${this.direction}`){
			this.receiveDamage = false
		}
	}

	restart(){
		this.maxHealth = this.health = 100
		this.receiveLife(1000)
		this.isDead = false
		this.framesHold = 5
		this.framesElapsed = 0
		this.direction = "right"
		this.switchSprite("idle_right")
		this.stopAnimation = false
		this.position.x = this.initial_position.x
		this.position.y = this.initial_position.y
		this.souls = 0
		this.dropLuck = 70
		this.speed = this.defaultSpeed
		this.attackSpeedMax = false
	}

	update(){
		this.draw()
		if(!this.stopAnimation) this.animation()
		this.swordAttack()

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		this.velocity.y += GRAVITY

		// this.position.x = Math.max(1, Math.min(canvas.width - this.width - 2, this.position.x))
	}
}