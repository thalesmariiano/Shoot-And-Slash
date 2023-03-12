
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
		const radar = detectInArea(this, player, 100)

		if(radar.right){
			this.isAttacking = true
		}else if(radar.left){
			this.isAttacking = true
		}else{
			this.isAttacking = false
		}
		

		// const {side, overlap, collider, target, distance} = collide(player, this)

		// if(overlap.x >= overlap.y){
		// 	if(distance.y > 0){
		// 		if(Math.abs(distance.y) < 0){
		// 		}
		// 	}else{
		// 		if(Math.abs(distance.y) < 0){
		// 		}	
		// 	}
		// }else{
		// 	if(distance.x < 0){
		// 		if(Math.abs(distance.x) < 100){
		// 			this.attackCountDown++
		// 			if(this.attackCountDown == 18){
		// 				player.takeHit(8)
		// 				this.attackCountDown = 0

		// 				if(developerMode){
		// 					ctx.fillStyle = "green"
		// 					ctx.fillRect(this.position.x - 100 + this.width, this.position.y + 30, 100, 10)
		// 				}
						
		// 			}
		// 		}else{
		// 			this.attackCountDown = 0
		// 		}
		// 	}else{
		// 		if(Math.abs(distance.x) < 100){
		// 			this.attackCountDown++
		// 			if(this.attackCountDown == 18){
		// 				player.takeHit(8)
		// 				this.attackCountDown = 0

		// 				if(developerMode){
		// 					ctx.fillStyle = "green"
		// 					ctx.fillRect(this.position.x, this.position.y + 30, 100, 10)
		// 				}
							
		// 			}
		// 		}else{
		// 			this.attackCountDown = 0
		// 		}
		// 	}
		// }
	}

	update(){
		this.draw()
		if(!this.animateFinished) this.animate()
		this.chasePlayer()
		this.attack()

		const radar = detectInArea(this, player, 200)

		if(!this.isChasingPlayer && !this.isDead && !this.isAttacking){
			if(this.direction == "RIGHT"){
				this.switchSprite("idle")	
			}else if(this.direction == "LEFT"){
				this.switchSprite("idle_left")	
			}
		}

		if(this.isChasingPlayer && !this.isDead && !this.isAttacking){
			if(this.direction == "RIGHT"){
				if(radar.right && player.isRunning){
					this.switchSprite("attack_run")					
				}else{
					this.switchSprite("run")					
				}
			}else if(this.direction == "LEFT"){
				if(radar.left && player.isRunning){
					this.switchSprite("attack_run_left")
				}else{
					this.switchSprite("run_left")
				}
			}
		}

		if(this.isAttacking){
			if(this.direction == "RIGHT"){	
				this.switchSprite("attack_3")
			}else if(this.direction == "LEFT"){
				this.switchSprite("attack_3_left")
			}
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