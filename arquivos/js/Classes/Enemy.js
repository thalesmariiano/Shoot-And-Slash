
class Enemy extends Entity {
	constructor({color, health, position}){
		super({color, position})
		
		this.speed = 3.5
		this.entityType = "Enemy"
		this.isChasingPlayer = false
		this.direction = "RIGHT"
		this.attack_timer = 0
		this.health = health
		this.offest = {
			x: 90,
			y: 150
		}
		this.sword = {
			width: 25,
			height: 65,
			position: {
				x: 0,
				y: 0
			}
		}
		this.entitySize = 250
	}

	animate(){
		this.configAnimation()

		this.framesElapsed++
		if(this.framesElapsed % this.framesHold === 0){
			this.currentFrames++
			if(this.currentFrames >= this.spriteFrames){
				if(this.sprInfo.name == `dead_${this.direction.toLowerCase()}`){
					this.animateFinished = true
					return
				}
				this.currentFrames = 0
			}
		}
		this.imgX = this.frameSizeX*this.currentFrames
	}

	configAnimation(){
		if(this.sprInfo && this.sprInfo.name == `dead_${this.direction.toLowerCase()}`) this.framesHold = 6
		if(this.sprInfo && this.sprInfo.name == `attack_1_${this.direction.toLowerCase()}`) this.framesHold = 6
	}

	takeHit(dmg, direction){
		this.health += -dmg
	}

	chasePlayer(){
		const enemyView = detectInArea(this, player, 500)
		const distanceToAttack = detectInArea(this, player, 100)

		if(!player.isDead && !this.isDead){
			if(enemyView.left && !distanceToAttack.left){
				this.velocity.x = -this.speed
				this.direction = "LEFT"
				this.isChasingPlayer = true
			}else if(enemyView.right && !distanceToAttack.right){
				this.velocity.x = this.speed
				this.direction = "RIGHT"
				this.isChasingPlayer = true
			}else{
				this.velocity.x = 0
				this.isChasingPlayer = false
			}
		}		

		if(developerMode){
			if(this.direction == "LEFT"){
				ctx.fillRect(this.position.x - 500 + this.width, this.position.y + 30, 500, 10)
			}else if(this.direction == "RIGHT"){
				ctx.fillRect(this.position.x, this.position.y + 30, 500, 10)
			}
		}
			
	}

	attack(){
		const attack_distance = detectInArea(this, player, 100)

		this.sword.width = 25
		this.sword.height = 65
		this.sword.position.y = this.position.y - 20
		if(attack_distance.left && !this.isDead && !player.isDead){
			this.sword.position.x = this.position.x - 70
			this.isAttacking = true
			this.useSword()
		}else if(attack_distance.right && !this.isDead && !player.isDead){
			this.sword.position.x = this.position.x + 120
			this.isAttacking = true
			this.useSword()
		}else{
			this.isAttacking = false
		}
	}

	useSword(t){
		this.attack_timer++
		if(this.attack_timer >= 25){

			const { side } = collide(this.sword, player)
			const sword_collide = side.top || side.bottom || side.left || side.right

			// ctx.fillStyle = "red"
			// ctx.fillRect(this.sword.position.x, this.sword.position.y, this.sword.width, this.sword.height)

			sword_collide ? player.takeHit(8) : player.receiveDamage = false
					
			this.attack_timer = 0
		}
	}

	update(){
		this.draw()
		if(!this.animateFinished) this.animate()
		this.chasePlayer()
		this.attack()

		const radar = detectInArea(this, player, 200)

		if(!this.isChasingPlayer && !this.isDead && !this.isAttacking){
			this.switchSprite(`idle_${this.direction.toLowerCase()}`)
		}

		if(this.isChasingPlayer && !this.isDead && !this.isAttacking){
			if(radar.right || radar.left && player.isRunning){
				this.switchSprite(`attack_run_${this.direction.toLowerCase()}`)
				this.sword.width = 65
				this.sword.height = 25
				this.sword.position.y = this.position.y + 30
				this.useSword(2)
			}else{
				this.switchSprite(`run_${this.direction.toLowerCase()}`)
			}
		}

		if(this.isAttacking && !this.isDead){
			this.switchSprite(`attack_1_${this.direction.toLowerCase()}`)
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