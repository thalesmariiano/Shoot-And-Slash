
class SkeletonSpearman extends Enemy {
	constructor({color, health, position}){
		super({color, health, position})

		this.chargeAttackDist = 140
		this.closeAttackDist = 105
	}

	closeAttack(){
		const sawPlayer = entityVision(this, player, {total: this.closeAttackDist})

		if(sawPlayer.left && !this.receiveDamage && !this.isProtecting){
			this.direction = 'left'
			this.isAttacking = true
			this.velocity.x = 0
			this.isRunning = false
			this.isChargeAttack = false

			// sword config for close attack
			this.sword.width = 25
			this.sword.height = 20	
			this.sword.position.x = this.position.x - 70
			this.sword.position.y = this.position.y + this.height/2 - 15
		}else if(sawPlayer.right && !this.receiveDamage && !this.isProtecting){
			this.direction = 'right'
			this.isAttacking = true
			this.velocity.x = 0
			this.isRunning = false
			this.isChargeAttack = false

			// sword config for close attack
			this.sword.width = 25
			this.sword.height = 20	
			this.sword.position.x = this.position.x + 105
			this.sword.position.y = this.position.y + this.height/2 - 15
		}else{
			this.isAttacking = false
		}

		this.attack(`attack_${this.attackSprite}_${this.direction}`, 5, 3)
	}

	chargeAttack(){
		const sawPlayer = entityVision(this, player, {total: this.chargeAttackDist})
		const targetTooClose = entityVision(this, player, {left: this.tooCloseDist, right: this.tooCloseDist})

		if(sawPlayer.left && this.isRunning && !targetTooClose.left && !this.receiveDamage && !this.isProtecting){
			// sword config for charge Attack
			this.sword.width = 25
			this.sword.height = 20
			this.sword.position.x = this.position.x - 70
			this.sword.position.y = this.position.y + this.height/2 - 15
			this.isChargeAttack = true
		}else if(sawPlayer.right && this.isRunning && !targetTooClose.right && !this.receiveDamage && !this.isProtecting){
			// sword config for charge Attack
			this.sword.width = 25
			this.sword.height = 20
			this.sword.position.x = this.position.x + 105
			this.sword.position.y = this.position.y + this.height/2 - 15
			this.isChargeAttack = true
		}else{
			this.isChargeAttack = false
		}

		this.attack(`run_attack_${this.direction}`, 30, 2)
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

		if(animation.name == `take_hit_${this.direction}`){
			this.receiveDamage = false
		}

		if(animation.name == `protect_${this.direction}`){
			this.isProtecting = false
		}

		if(animation.name == `run_attack_${this.direction}`){
			this.isChargeAttack = false
		}

		if(animation.name == `attack_1_${this.direction}`){
			this.attackSprite = 2
			this.entityAttacked = false
		}else if(animation.name == `attack_2_${this.direction}`){
			this.attackSprite = 1
			this.entityAttacked = false
		}
	}

	update(){
		if(!this.stopAnimation) this.animation()

		if(!this.isDead && !this.receiveDamage && !player.isDead){
			this.jumpObstacle()
			this.closeAttack()
			this.chargeAttack()
			this.chasePlayer()
			this.sawPlayerWalking()
			this.walkAround()
		}else{
			this.isAttacking = false
			this.isChargeAttack = false
			this.isRunning = false
		}

		if(player.isDead) this.velocity.x = 0
		
		if(!this.isChargeAttack && !this.isProtecting && !this.isRunning && !this.isDead && !this.isAttacking && !this.receiveDamage && !this.isWalking){
			this.switchSprite(`idle_${this.direction}`)
		}

		if(this.isRunning && !this.isProtecting && !this.isChargeAttack && !this.isDead && !this.isAttacking && !this.receiveDamage && !this.isWalking){
			this.switchSprite(`run_${this.direction}`)
		}

		if(this.isWalking && !this.isProtecting && !this.isRunning && !this.isChargeAttack && !this.isDead && !this.isAttacking && !this.receiveDamage){
			this.switchSprite(`walk_${this.direction}`)
		}

		if(this.isChargeAttack && !this.isProtecting && !player.isRunning && !this.isAttacking && !this.receiveDamage && !this.isWalking){
			this.switchSprite(`run_attack_${this.direction}`)
		}

		if(this.isAttacking && !this.isProtecting && !this.isDead && !this.receiveDamage && !this.isWalking){
			this.switchSprite(`attack_${this.attackSprite}_${this.direction}`)
		}

		if(this.receiveDamage && !this.isProtecting && !this.isDead){
			this.switchSprite(`take_hit_${this.direction}`)
		}

		if(this.sprInfo.name == `run_attack_${this.direction}`){
			if(this.currentFrames == 3){
				this.entityAttacked = false
			}
		}

		if(this.isProtecting && !this.isDead){
			this.switchSprite(`protect_${this.direction}`)
		}

		if(this.health <= 0 && !this.isDead){
			this.isDead = true

			if(GAMEMODE){
				GAMEMODE.enemysKilled++
			}
			
			this.velocity.x = 0
			this.switchSprite(`fall_${this.direction}`)
		}

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		this.velocity.y += GRAVITY

	}
}