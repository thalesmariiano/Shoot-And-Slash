
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

	onAnimationEnd(animation){
		if(animation.name == `dead_${this.direction}`){
			this.stopAnimation = true

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
			setTimeout(() => this.visible = false, 3000)
		}
	}

	takeHit(dmg, direction){
		this.health += -dmg
		this.receiveDamage = true
		if(!this.isFalling && !this.isDead && this.receiveDamage){
			this.velocity.y = -8
			this.isFalling = true
		}
		
		if(player.direction == "right") this.velocity.x = Math.floor(Math.random() * 5 - 2) + 1
		else if(player.direction == "left") this.velocity.x = -Math.floor(Math.random() * 5 - 2) + 1

		this.switchSprite(`take_hit_${this.direction}`)
		setTimeout(() => {
			this.velocity.x = 0
			this.receiveDamage = false
		}, 700)
	}

	chasePlayer(){
		const view_distance = detectInArea(this, player, 500)

		if(view_distance.left && !this.isAttacking && !player.isDead && !this.isDead){
			this.velocity.x = -this.speed
			this.direction = "left"
			this.isChasingPlayer = true
		}else if(view_distance.right && !this.isAttacking && !player.isDead && !this.isDead){
			this.velocity.x = this.speed
			this.direction = "right"
			this.isChasingPlayer = true
		}else{
			this.velocity.x = 0
			this.isChasingPlayer = false
		}	

		if(developerMode){
			if(this.direction == "left"){
				buffer.fillRect(this.position.x - 500 + this.width, this.position.y + 30, 500, 10)
			}else if(this.direction == "right"){
				buffer.fillRect(this.position.x, this.position.y + 30, 500, 10)
			}
		}		
	}

	swordAttack(){
		const attack_distance = detectInArea(this, player, 100)
		const distance_to_fallback = detectInArea(this, player, 80)

		if(distance_to_fallback.left && !player.isDead && !this.isDead){
			this.position.x += this.speed
		}else if(distance_to_fallback.right && !player.isDead && !this.isDead){
			this.position.x -= this.speed
		}

		if(attack_distance.left && !player.isDead && !this.isDead){
			this.velocity.x = 0
			this.isChasingPlayer = false

			this.sword.width = 25
			this.sword.height = 65	
			this.sword.position.y = this.position.y - 20
			this.sword.position.x = this.position.x - 73
			this.direction = "left"
			this.isAttacking = true
		}else if(attack_distance.right && !player.isDead && !this.isDead){
			this.velocity.x = 0
			this.isChasingPlayer = false

			this.sword.width = 25
			this.sword.height = 65	
			this.sword.position.x = this.position.x + 117
			this.sword.position.y = this.position.y - 20
			this.direction = "right"
			this.isAttacking = true
		}else{
			this.isAttacking = false
		}

		if(this.currentFrames == 4 && this.sprInfo.name == `attack_${this.attack}_${this.direction}`){
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

		if(this.currentFrames == 4 && this.sprInfo.name == `attack_run_${this.direction}`){
			const { side } = collide(this.sword, player)
			const sword_collide = side.top || side.bottom || side.left || side.right

			sword_collide ? player.takeHit(1.5) : player.receiveDamage = false

			// ctx.fillStyle = "red"
			// ctx.fillRect(this.sword.position.x, this.sword.position.y, this.sword.width, this.sword.height)
		}
	}

	update(){
		// this.draw()
		if(!this.stopAnimation) this.animation()

		if(!this.receiveDamage){
			this.chasePlayer()
			this.swordAttack()
			this.runningSwordAttack()
		}
		

		if(!this.isChasingPlayer && !this.isDead && !this.isAttacking && !this.receiveDamage){
			this.switchSprite(`idle_${this.direction}`)
		}

		if(this.isChasingPlayer && !this.isDead && !this.isAttacking && !this.receiveDamage){
			if(this.isRunningAttacking && player.isRunning){
				this.switchSprite(`attack_run_${this.direction}`)
			}else{
				this.switchSprite(`run_${this.direction}`)
			}
		}

		if(this.isAttacking && !this.isDead && !this.receiveDamage){
			this.switchSprite(`attack_${this.attack}_${this.direction}`)
		}

		if(this.health <= 0 && !this.isDead){
			this.isDead = true

			enemysKilled++
			this.velocity.x = 0
			this.switchSprite(`dead_${this.direction}`)
		}

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		this.velocity.y += GRAVITY

	}

}