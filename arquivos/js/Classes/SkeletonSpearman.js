
class SkeletonSpearman extends Enemy {
	constructor({color, health, position}){
		super({color, health, position})

		this.chargeDist = 140
	}

	closeAttack(playerDirection){
		if(playerDirection == 'left'){
			this.direction = 'left'
			this.isAttacking = true
			this.velocity.x = 0
			this.isRunning = false

			// sword config for close attack
			this.sword.width = 25
			this.sword.height = 20	
			this.sword.position.x = this.position.x - 70
			this.sword.position.y = this.position.y + this.height/2 - 15
		}else if(playerDirection == 'right'){
			this.direction = 'right'
			this.isAttacking = true
			this.velocity.x = 0
			this.isRunning = false

			// sword config for close attack
			this.sword.width = 25
			this.sword.height = 20	
			this.sword.position.x = this.position.x + 105
			this.sword.position.y = this.position.y + this.height/2 - 15
		}else{
			this.isAttacking = false
		}

		this.attack(`attack_${this.attackSprite}_${this.direction}`, 2, 3)
	}

	chargeAttack(direction){
		if(direction == 'left'){
			// sword config for running Attack
			this.sword.width = 25
			this.sword.height = 20
			this.sword.position.x = this.position.x - 70
			this.sword.position.y = this.position.y + this.height/2 - 15
			this.isChargeAttack = true
		}else if(direction == 'right'){
			// sword config for running Attack
			this.sword.width = 25
			this.sword.height = 20
			this.sword.position.x = this.position.x + 105
			this.sword.position.y = this.position.y + this.height/2 - 15
			this.isChargeAttack = true
		}else{
			this.isChargeAttack = false
		}

		this.attack(`run_attack_${this.direction}`, 10, 2)
	}

	onAnimationEnd(animation){
		if(animation.name == `fall_${this.direction}`){
			this.switchSprite(`dead_${this.direction}`)
		}

		if(animation.name == `dead_${this.direction}`){
			this.stopAnimation = true
			this.dropItem()
			setTimeout(() => this.visible = false, 3000)
		}

		if(animation.name == `run_attack_${this.direction}`){
			this.isChargeAttack = false
		}

		if(animation.name == `attack_1_${this.direction}`){
			this.attackSprite = 2
		}else if(animation.name == `attack_2_${this.direction}`){
			this.attackSprite = 1
		}
	}

	update(){
		// this.draw()
		if(!this.stopAnimation) this.animation()

		if(!this.isDead && !this.receiveDamage && !player.isDead){
			this.detectPlayer()
		}else{
			this.isAttacking = false
			this.isChargeAttack = false
			this.isRunning = false
		}
		
		if(!this.isChargeAttack && !this.isRunning && !this.isDead && !this.isAttacking && !this.receiveDamage){
			this.switchSprite(`idle_${this.direction}`)
		}

		if(this.isRunning && !this.isChargeAttack && !this.isDead && !this.isAttacking && !this.receiveDamage){
			this.switchSprite(`run_${this.direction}`)
		}

		if(this.isChargeAttack && !player.isRunning && !this.isAttacking){
			this.switchSprite(`run_attack_${this.direction}`)
		}

		if(this.isAttacking && !this.isDead && !this.receiveDamage){
			this.switchSprite(`attack_${this.attackSprite}_${this.direction}`)
		}

		if(this.health <= 0 && !this.isDead){
			this.isDead = true

			enemysKilled++
			this.velocity.x = 0
			this.switchSprite(`fall_${this.direction}`)
		}

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		this.velocity.y += GRAVITY

	}
}