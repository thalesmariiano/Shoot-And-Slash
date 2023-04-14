
class Enemy extends Entity {
	constructor({color, health, position}){
		super({color, position})
		
		this.speed = 3.5
		this.isChasingPlayer = false
		this.isRunningAttacking = false
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
		this.attack = 1
		this.entitySizeX = 240
		this.entitySizeY = 240
		this.entityType = "Enemy"
	}

	animation(){
		this.framesElapsed++
		if(this.framesElapsed % this.framesHold === 0){
			this.currentFrames++
			if(this.currentFrames >= this.spriteFrames){
				if(this.sprInfo.name == `dead_${this.direction.toLowerCase()}`){
					this.endAnimation = true

					if((Math.floor(Math.random() * 100) + 1) < player.dropLuck){
						const soul = new Item({
							itemType: "soul",
							position: {
								x: this.position.x + this.width/2,
								y: this.position.y + this.height/2
							}
						})
						soul.setSprites(itens_sprites.enemy_soul.sprites)
						itensArray.push(soul)
					}

					enemysKilled++
					setTimeout(() => this.visible = false, 3000)

					return
				}
				this.currentFrames = 0
			}
		}
		this.imgX = this.frameSizeX*this.currentFrames
	}

	takeHit(dmg, direction){
		this.health += -dmg
		this.receiveDamage = true
		if(!this.isFalling && !this.isDead && this.receiveDamage){
			this.velocity.y = -8
			this.isFalling = true
		}
		
		if(player.direction == "RIGHT") this.velocity.x = Math.floor(Math.random() * 5 - 2) + 1
		else if(player.direction == "LEFT") this.velocity.x = -Math.floor(Math.random() * 5 - 2) + 1

		this.switchSprite(`take_hit_${this.direction.toLowerCase()}`)
		setTimeout(() => {
			this.velocity.x = 0
			this.receiveDamage = false
		}, 700)
	}

	chasePlayer(){
		const view_distance = detectInArea(this, player, 500)

		if(view_distance.left && !this.isAttacking && !player.isDead && !this.isDead){
			this.velocity.x = -this.speed
			this.direction = "LEFT"
			this.isChasingPlayer = true
		}else if(view_distance.right && !this.isAttacking && !player.isDead && !this.isDead){
			this.velocity.x = this.speed
			this.direction = "RIGHT"
			this.isChasingPlayer = true
		}else{
			this.velocity.x = 0
			this.isChasingPlayer = false
		}	

		if(developerMode){
			if(this.direction == "LEFT"){
				ctx.fillRect(this.position.x - 500 + this.width, this.position.y + 30, 500, 10)
			}else if(this.direction == "RIGHT"){
				ctx.fillRect(this.position.x, this.position.y + 30, 500, 10)
			}
		}		
	}

	swordAttack(){
		const attack_distance = detectInArea(this, player, 100)

		if(attack_distance.left && !player.isDead && !this.isDead){
			this.sword.width = 25
			this.sword.height = 65	
			this.sword.position.y = this.position.y - 20
			this.sword.position.x = this.position.x - 73
			this.direction = "LEFT"
			this.isAttacking = true
		}else if(attack_distance.right && !player.isDead && !this.isDead){
			this.sword.width = 25
			this.sword.height = 65	
			this.sword.position.x = this.position.x + 117
			this.sword.position.y = this.position.y - 20
			this.direction = "RIGHT"
			this.isAttacking = true
		}else{
			this.isAttacking = false
		}

		if(this.currentFrames == 4 && this.sprInfo.name == `attack_${this.attack}_${this.direction.toLowerCase()}`){
			const { side } = collide(this.sword, player)
			const sword_collide = side.top || side.bottom || side.left || side.right

			sword_collide ? player.takeHit(2) : player.receiveDamage = false

			// ctx.fillStyle = "red"
			// ctx.fillRect(this.sword.position.x, this.sword.position.y, this.sword.width, this.sword.height)
		}
	}

	runningSwordAttack(){
		const attack_run_distance = detectInArea(this, player, 200)

		if(attack_run_distance.left && !player.isDead && !this.isDead){
			this.sword.width = 50
			this.sword.height = 25
			this.sword.position.x = this.position.x - 80
			this.sword.position.y = this.position.y + 45
			this.isRunningAttacking = true
		}else if(attack_run_distance.right && !player.isDead && !this.isDead){
			this.sword.width = 50
			this.sword.height = 25
			this.sword.position.x = this.position.x + 100
			this.sword.position.y = this.position.y + 45
			this.isRunningAttacking = true
		}else{
			this.isRunningAttacking = false
		}

		if(this.currentFrames == 4 && this.sprInfo.name == `attack_run_${this.direction.toLowerCase()}`){
			const { side } = collide(this.sword, player)
			const sword_collide = side.top || side.bottom || side.left || side.right

			sword_collide ? player.takeHit(1.5) : player.receiveDamage = false

			// ctx.fillStyle = "red"
			// ctx.fillRect(this.sword.position.x, this.sword.position.y, this.sword.width, this.sword.height)
		}
	}

	update(){
		// this.draw()
		if(!this.endAnimation) this.animation()

		if(!this.receiveDamage){
			this.chasePlayer()
			this.swordAttack()
			this.runningSwordAttack()
		}
		

		if(!this.isChasingPlayer && !this.isDead && !this.isAttacking && !this.receiveDamage){
			this.switchSprite(`idle_${this.direction.toLowerCase()}`)
		}

		if(this.isChasingPlayer && !this.isDead && !this.isAttacking && !this.receiveDamage){
			if(this.isRunningAttacking && player.isRunning){
				this.switchSprite(`attack_run_${this.direction.toLowerCase()}`)
			}else{
				this.switchSprite(`run_${this.direction.toLowerCase()}`)
			}
		}

		if(this.isAttacking && !this.isDead && !this.receiveDamage){
			this.switchSprite(`attack_${this.attack}_${this.direction.toLowerCase()}`)
		}

		if(this.health <= 0){
			this.isDead = true
		}

		if(this.isDead){
			this.velocity.x = 0
			this.switchSprite(`dead_${this.direction.toLowerCase()}`)
		}

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		this.velocity.y += GRAVITY

	}

}