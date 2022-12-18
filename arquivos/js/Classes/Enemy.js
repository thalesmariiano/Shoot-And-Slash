
class Enemy extends Entity {
	constructor({color, imgSrc, position}){
		super({color, imgSrc, position})
		
		this.speed = 3.5
		this.entityType = "Enemy"
		this.isChasingPlayer = false
		this.direction = null
		this.attackCountDown = 0
		this.willJump = false
	}

	draw(){
		ctx.fillStyle = this.color
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

		ctx.font = "15px Arial"
		ctx.fillStyle = "black"
		ctx.fillText(this.health, this.position.x + 13, this.position.y - 25)
	}

	takeHit(dmg){
		this.health += -dmg
	}

	chasePlayer(){
		const {side, overlap, collider, target, distance} = collide(this, player)

		if(overlap.x >= overlap.y){
			if(distance.y < 0){
				if(Math.abs(distance.y) < 500){
				}	
			}else{
				if(Math.abs(distance.y) < 500){
				}	
			}
		}else{
			if(distance.x > 0){
				if(Math.abs(distance.x) < 500){
					this.velocity.x = -this.speed
					this.direction = "LEFT"
					this.isChasingPlayer = true
				}else{
					this.velocity.x = 0
					this.direction = null
					this.isChasingPlayer = false
				}
			}else{
				if(Math.abs(distance.x) < 500){
					this.velocity.x = this.speed
					this.direction = "RIGHT"
					this.isChasingPlayer = true
				}else{
					this.velocity.x = 0
					this.direction = null
					this.isChasingPlayer = false
				}
			}
		}
	}

	attack(){
		const {side, overlap, collider, target, distance} = collide(player, this)

		if(side.top || side.bottom || side.left || side.right){
			this.attackCountDown++
			if(this.attackCountDown == 10){
				collider.takeHit(8)
				this.attackCountDown = 0
			}
		}
	}

	update(){
		this.draw()
		this.chasePlayer()
		this.attack()

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		this.velocity.y += GRAVITY

		// Caso caia da tela, teletransportar para fora
		if(this.position.y + (this.height - 200) > canvas.height){
			this.position.x = 10
			this.position.y = 10
		}

		if(this.health <= 0){
			this.visible = false
		}
	}
}