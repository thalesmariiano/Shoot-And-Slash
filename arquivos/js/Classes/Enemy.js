
class Enemy extends Entity {
	constructor({color, health, position}){
		super({color, position})
		
		this.speed = 3.5
		this.entityType = "Enemy"
		this.isChasingPlayer = false
		this.direction = "RIGHT"
		this.attackCountDown = 0
		this.health = health
		this.offest = {
			x: 90,
			y: 140
		}
		this.entitySize = 250
	}

	animate(){
		this.configAnimation()

		this.framesElapsed++
		if(this.framesElapsed % this.framesHold === 0){
			this.currentFrames++
			if(this.currentFrames >= this.spriteFrames){
				if(this.sprInfo.name == "dead"){
					this.animateFinished = true
					return
				}
				this.currentFrames = 0
			}
		}
		this.imgX = this.frameSizeX*this.currentFrames
	}

	configAnimation(){
		if(this.sprInfo && this.sprInfo.name == "dead") this.framesHold = 6
	}

	takeHit(dmg, direction){
		this.health += -dmg
	}

	chasePlayer(){
		const radar = detectInArea(this, player, 500)
		const closest = detectInArea(this, player, 100)
		const closest_running = detectInArea(this, player, 200)

		if(!player.isDead){

			if(radar.left && !closest.left){
				this.velocity.x = -this.speed
				this.direction = "LEFT"
				this.isChasingPlayer = true
			}else if(radar.right && !closest.right){
				this.velocity.x = this.speed
				this.direction = "RIGHT"
				this.isChasingPlayer = true
			}else{
				this.velocity.x = 0
				this.isChasingPlayer = false
			}

			if(closest.left || closest.right || closest_running.right || closest_running.left){
				this.isAttacking = true
			}else{
				this.isAttacking = false
			}

		}else{
			this.isAttacking = false
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

	attack(){
		if(this.isAttacking){
			this.attackCountDown++
			if(this.attackCountDown >= 20){
				player.takeHit(8)
				this.attackCountDown = 0
			}
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
			}else{
				this.switchSprite(`run_${this.direction.toLowerCase()}`)
			}
		}

		if(this.isAttacking && !this.isDead){
			this.switchSprite(`attack_2_${this.direction.toLowerCase()}`)
		}

		if(this.health <= 0){
			this.isDead = true
		}

		if(this.isDead){
			this.isChasingPlayer = false
			this.velocity.x = 0
			this.switchSprite("dead")
		}

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		this.velocity.y += GRAVITY

	}

}