
class Enemy extends Entity {
	constructor({color, health, position}){
		super({color, position})
		
		this.runSpeed = 3.5
		this.walkSpeed = 2
		this.health = health
		this.offest = {
			x: 90,
			y: 140
		}
		this.sword = {
			width: 25,
			height: 65,
			position: {
				x: 0,
				y: 0
			}
		}
		//
		this.entitySizeX = 240
		this.entitySizeY = 240
		this.entityType = "Enemy"
		//
		this.viewDist = 500
		this.chargeAttackDist = 200
		this.closeAttackDist = 100
		this.tooCloseDistX = 80
		this.tooCloseDistY = 80
		this.isFallbacking = false
	}

	onAnimationEnd(animation){
		if(animation.name == `dead_${this.direction}`){
			this.stopAnimation = true
			this.dropItem()
			setTimeout(() => this.visible = false, 3000)
		}

		if(animation.name == `protect_${this.direction}`){
			this.isProtecting = false
		}

		if(animation.name == `take_hit_${this.direction}`){
			this.receiveDamage = false
		}

		if(animation.name == `attack_${this.attackSprite}_${this.direction}`){
			this.entityAttacked = false			
		}

		if(animation.name == `run_attack_${this.direction}`){
			this.isChargeAttack = false
		}
	}

	dropItem(){	
		if((Math.floor(Math.random() * 100) + 1) < player.dropLuck){
			const soul = new Item({
				itemType: "soul",
				position: {
					x: this.position.x + this.width/2,
					y: this.position.y + this.height/2
				}
			})
			soul.setSprites(itens_sprites.enemy_soul)
			itensArray.push(soul)
		}
	}

	takeHit(dmg, direction){
		const willProtect = Math.floor(Math.random() * 5)

		if(this.isProtecting) return

		if(willProtect === 2){
			this.direction == player.direction
			this.isProtecting = true
			this.velocity.x = 0
			return 
		}
		
		this.health += -dmg
		this.receiveDamage = true
		skeleton_hit.play()

		if(!this.isFalling && !this.isJumping && !this.isDead){
			this.jump()
			this.velocity.x = player.direction == 'right' ? 2 : -2
		}
	}

	attack(animation, dmg, frame){
		if(this.currentFrames == frame && this.sprInfo.name == animation){
			const { isColliding } = hitBox(this.sword, player)

			if(isColliding && !this.entityAttacked){
				this.entityAttacked = true
				player.takeHit(dmg)
			}
		}
	}

	walkLeft(){
		this.direction = 'left'
		this.velocity.x = -this.walkSpeed
		this.isWalking = true
	}

	walkRight(){
		this.direction = 'right'
		this.velocity.x = this.walkSpeed
		this.isWalking = true
	}

	jumpObstacle(){
		mapBlocks.forEach(block =>{
			if(block.visible){
				const vision = entityVision(this, block, {left: 70, right: 70})
				const inactive_conditions = !this.isProtecting && !this.isAttacking && !this.receiveDamage

				if(vision.left && this.isRunning && inactive_conditions){
					if(!this.isFalling && !this.isJumping){
						this.jump()
					}
				}

				if(vision.right && this.isRunning && inactive_conditions){
					if(!this.isFalling && !this.isJumping){
						this.jump()
					}
				}
			}
		})
	}

	closeAttack(){
		const sawPlayer = entityVision(this, player, {total: this.closeAttackDist})

		if(sawPlayer.left && !this.receiveDamage && !this.isProtecting && !this.isWalking){
			this.direction = 'left'
			this.isAttacking = true
			this.velocity.x = 0
			this.isRunning = false
			this.isChargeAttack = false

			// sword config for close attack
			this.sword.width = 25
			this.sword.height = 65	
			this.sword.position.y = this.position.y - 20
			this.sword.position.x = this.position.x - 73
		}else if(sawPlayer.right && !this.receiveDamage && !this.isProtecting && !this.isWalking){
			this.direction = 'right'
			this.isAttacking = true
			this.velocity.x = 0
			this.isRunning = false
			this.isChargeAttack = false

			// sword config for close attack
			this.sword.width = 25
			this.sword.height = 65	
			this.sword.position.x = this.position.x + 117
			this.sword.position.y = this.position.y - 20
		}else{
			this.isAttacking = false
		}

		this.attack(`attack_${this.attackSprite}_${this.direction}`, 5, 4)
	}

	chargeAttack(){
		const sawPlayer = entityVision(this, player, {total: this.chargeAttackDist})
		const targetTooClose = entityVision(this, player, {left: this.tooCloseDist, right: this.tooCloseDist})

		if(sawPlayer.left && this.isRunning && !targetTooClose.left && !this.receiveDamage && !this.isProtecting){
			// sword config for charge Attack
			this.sword.width = 50
			this.sword.height = 25
			this.sword.position.x = this.position.x - 80
			this.sword.position.y = this.position.y + 45
			this.isChargeAttack = true
		}else if(sawPlayer.right && this.isRunning && !targetTooClose.right && !this.receiveDamage && !this.isProtecting){
			// sword config for charge Attack
			this.sword.width = 50
			this.sword.height = 25
			this.sword.position.x = this.position.x + 100
			this.sword.position.y = this.position.y + 45
			this.isChargeAttack = true
		}else{
			this.isChargeAttack = false
		}

		this.attack(`run_attack_${this.direction}`, 30, 4)
	}

	sawPlayerWalking(){
		const sawPlayer = entityVision(this, player, {total: this.viewDist})
		const inactive_conditions = !this.isRunning && !this.isAttacking && !this.receiveDamage && !this.isProtecting

		if(sawPlayer.left && this.direction == 'left' && inactive_conditions){
			this.runLeft()
			this.isWalking = false
		}

		if(sawPlayer.right && this.direction == 'right' && inactive_conditions){
			this.runRight()
			this.isWalking = false
		}
	}

	chasePlayer(){
		const chase = entityVision(this, player, {total: this.viewDist})

		if(!chase.left && !chase.right && !this.receiveDamage && !this.isProtecting){
			this.isRunning = false
		}

		if(chase.left && this.isRunning && !this.isAttacking && !this.receiveDamage && !this.isProtecting){
			this.runLeft()
			this.isWalking = false
		}

		if(chase.right && this.isRunning && !this.isAttacking && !this.receiveDamage && !this.isProtecting){
			this.runRight()
			this.isWalking = false
		}
	}

	walkAround(){
		mapBlocks.forEach(block =>{
			if(block.visible){
				const vision = entityVision(this, block, {left: 60, right: 60})
				const inactive_conditions = !this.isRunning && !this.isAttacking && !this.receiveDamage && !this.isProtecting

				if(!vision.right && !vision.left && inactive_conditions){
					if(!this.isWalking){
						if(this.direction == 'left'){
							this.walkLeft()
						}else if(this.direction == 'right'){
							this.walkRight()
						}
					}	
				}

				// Colisão na esquerda, ir pra direita
				if(vision.left && inactive_conditions){
					this.walkRight()
				}

				// Colisão na direita, ir pra esquerda
				if(vision.right && inactive_conditions){
					this.walkLeft()
				}
			}
		})
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

		if(this.sprInfo.name == `run_attack_${this.direction}` && !this.isProtecting && !this.receiveDamage && !this.isWalking){
			if(this.currentFrames == 5){
				this.entityAttacked = false
			}
		}

		if(this.isProtecting && !this.isDead){
			this.switchSprite(`protect_${this.direction}`)
		}

		if(this.health <= 0 && !this.isDead){
			this.isDead = true

			newArcade.enemysKilled++
			this.velocity.x = 0
			this.switchSprite(`dead_${this.direction}`)
		}

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		this.velocity.y += GRAVITY
	}
}