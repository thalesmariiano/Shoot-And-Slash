
class SkeletonSpearman extends Enemy {
	constructor({color, health, position}){
		super({color, health, position})
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

	onAnimationEnd(animation){
		if(animation.name == `fall_${this.direction}`){
			this.switchSprite(`dead_${this.direction}`)
		}

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
			this.isRunningAttacking = false
			this.isRunning = false
			this.isChasingPlayer = false
		}
		
		if(!this.isChasingPlayer && !this.isRunning && !this.isDead && !this.isAttacking && !this.receiveDamage){
			this.switchSprite(`idle_${this.direction}`)
		}

		if(this.isChasingPlayer && !this.isDead && !this.isAttacking && !this.receiveDamage){
			if(this.isRunningAttacking && player.isRunning){
				this.switchSprite(`run_attack_${this.direction}`)
			}else{
				this.switchSprite(`run_${this.direction}`)
			}
		}

		if(this.isRunning && !this.isDead && !this.isAttacking){
			this.switchSprite(`run_${this.direction}`)
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