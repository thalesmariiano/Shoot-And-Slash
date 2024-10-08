
class Player extends Entity {
	constructor({color, position}){
		super({color, position})
		
		this.souls = 0
		this.mana = 50
		this.maxMana = 50
		this.blockFire = false
		this.inventory = [
			{
				id: 1,
				item: null,
				isHolding: false
			},
			{
				id: 2,
				item: null,
				isHolding: false,
			},
			{
				id: 3,
				item: null,
				isHolding: false,
			}
		]
		this.offest = {
			x: 170,
			y: 143
		}
		this.attDamage = 15
		this.sword = {
			width: 100,
			height: 50,
			position: {
				x: 0,
				y: 0
			}
		}
		this.attackSpeedMax = false
		this.dropLuck = 70
		this.entitySizeX = 400
		this.entitySizeY = 400
		//
		this.entityType = "Player"
	}

	getInventory(id){
		return this.inventory.find(i => i.id == id)
	}

	getHoldingItem(){
		return this.inventory.find(i => i.isHolding)
	}

	receiveLife(received_life){
		const life_lack = Math.abs(this.health - this.maxHealth)
		this.health += life_lack < received_life ? life_lack : received_life
		hud('health-amount').updateAmount(this.health)
	}

	swordAttack(){
		if(this.currentFrames == 4 && this.sprInfo.name == `attack_${this.attackSprite}_${this.direction}`){

			enemys.forEach(enemy => {
				if(!enemy.isDead){
					const { isColliding } = hitBox(this.sword, enemy)

					if(isColliding && !this.entityAttacked){
						this.entityAttacked = true
						enemy.takeHit(this.attDamage)
					}
				}
			})

			if(this.direction == "right") this.sword.position.x = this.position.x + 110
			else if(this.direction == "left") this.sword.position.x = this.position.x - 150

			this.sword.position.y = this.position.y + 15
		}else{
			this.entityAttacked = false
		}
	}

	shootFireball(){
		if(this.mana && !this.blockFire){
			this.mana -= 25
			this.blockFire = true
			hud('mana-amount').updateAmount(this.mana)

			const fireball = new Projectile({
				projectile: 'fireball',
				position: {
					x: this.position.x,
					y: this.position.y + this.height/2 - 20
				}
			})
			fireball.direction = this.direction
			fireball.setSprites(itens_sprites.fireball)
			magicPowers.push(fireball)

			setTimeout(() => {
				this.blockFire = false
			}, 300)
		}
	}

	takeHit(damage_taken){
		this.health -= damage_taken
		this.receiveDamage = true
		hud('health-amount').updateAmount(this.health)
	}

	animate(){
		if(!this.isJumping && !this.isFalling && this.isIdle && !this.isDead){
			this.switchSprite(`idle_${this.direction}`)		
		}
	
		if(this.isJumping && !this.isDead && !this.isFalling){
			this.switchSprite(`jump_${this.direction}`)
		}
		
		if(this.isFalling && !this.isDead){
			this.switchSprite(`fall_${this.direction}`)		
		}
	
		if( this.isRunning && !this.isJumping && !this.isDead && !this.isFalling){
			this.switchSprite(`run_${this.direction}`)
		}
		
		if(this.receiveDamage && !this.isDead && !this.isAttacking){
			this.switchSprite(`take_hit_${this.direction}`)
		}
	
		if(this.isAttacking && !this.isRunning && !this.isDead){
			this.switchSprite(`attack_${this.attackSprite}_${this.direction}`)
		}
	
		if(this.isDead){
			this.switchSprite(`death_${this.direction}`)
		}
	}

	onAnimation({sprite, frame}){
		if(sprite.name == `attack_1_${this.direction}`){
			if(frame == 3){
				sword_whoosh_3.play()
			}
		}
		if(sprite.name == `attack_2_${this.direction}`){
			if(frame == 3){
				sword_whoosh_2.play()
			}
		}
		if(sprite.name == `run_${this.direction}`){
			walking.play()
		}else{
			walking.pause()
		}
	}

	onAnimationEnd(animation){
		if(animation.name == `attack_1_${this.direction}`){
			this.attackSprite = 2
		}else if(animation.name == `attack_2_${this.direction}`){
			this.attackSprite = 1
		}

		if(animation.name == `death_${this.direction}`){
			this.stopAnimation = true
		}

		if(animation.name == `take_hit_${this.direction}`){
			this.receiveDamage = false
		}
	}

	restart(){
		this.maxHealth = this.health = 100
		this.maxMana = this.mana = 50
		this.receiveLife(1000)
		this.isDead = false
		this.framesHold = 5
		this.framesElapsed = 0
		this.direction = "right"
		this.switchSprite("idle_right")
		this.stopAnimation = false
		this.position.x = this.initial_position.x
		this.position.y = this.initial_position.y
		this.souls = 0
		this.dropLuck = 70
		this.runSpeed = this.defaultSpeed
		this.attackSpeedMax = false
	}

	update(){
		if(!this.stopAnimation) this.animation()
		this.swordAttack()
		this.animate()

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		this.velocity.y += GRAVITY

		// this.position.x = Math.max(1, Math.min(canvas.width - this.width - 2, this.position.x))
	}
}