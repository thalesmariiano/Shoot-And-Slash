
class Enemy extends Entity {
	constructor({color, health, position}){
		super({color, position})
		
		this.speed = 3.5
		this.isChargeAttack = false
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
		this.attackSprite = 1
		this.entitySizeX = 240
		this.entitySizeY = 240
		this.entityType = "Enemy"

		this.farDist = 500
		this.chargeDist = 200
		this.closeDist = 100
		this.tooCloseDistX = 80
		this.tooCloseDistY = 200
	}

	onAnimationEnd(animation){
		if(animation.name == `dead_${this.direction}`){
			this.stopAnimation = true
			this.dropItem()
			setTimeout(() => this.visible = false, 3000)
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
			soul.setSprites(itens_sprites.enemy_soul.sprites)
			itensArray.push(soul)
		}
	}

	takeHit(dmg, direction){
		this.health += -dmg
		this.receiveDamage = true
		skeleton_hit_sound.play()
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

	chasePlayer(playerDirection){
		if(playerDirection == 'left'){
			this.direction = 'left'
			this.velocity.x = -this.speed
			this.isRunning = true
		}else if(playerDirection == 'right'){
			this.direction = 'right'
			this.velocity.x = this.speed
			this.isRunning = true
		}else{
			this.velocity.x = 0
			this.isRunning = false
		}
	}

	chargeAttack(direction){
		if(direction == 'left'){
			// sword config for running Attack
			this.sword.width = 50
			this.sword.height = 25
			this.sword.position.x = this.position.x - 80
			this.sword.position.y = this.position.y + 45
			this.isChargeAttack = true
		}else if(direction == 'right'){
			// sword config for running Attack
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

	closeAttack(playerDirection){
		if(playerDirection == 'left'){
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
		}else if(playerDirection == 'right'){
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

	fallback(playerDirection){
		if(playerDirection == 'left'){
			this.direction = 'right'
			this.velocity.x = this.speed + 1
			this.isRunning = true
		}else if(playerDirection == 'right'){
			this.direction = 'left'
			this.velocity.x = -(this.speed + 1)
			this.isRunning = true
		}
	}

	attack(animation, dmg, frame){
		if(this.currentFrames == frame && this.sprInfo.name == animation){
			const { side } = collide(this.sword, player)
			const sword_collide = side.top || side.bottom || side.left || side.right

			if(sword_collide && !this.entityAttacked){
				this.entityAttacked = true
				player.takeHit(dmg)
			}

			if(developerMode){
				buffer.fillStyle = "red"
				buffer.fillRect(this.sword.position.x, this.sword.position.y, this.sword.width, this.sword.height)
			}
		}
	}

	detectPlayer(){
		const isFarAway = detectInArea(this, player, this.farDist)
		const closeToCharge = detectInArea(this, player, this.chargeDist)
		const isClose = detectInArea(this, player, this.closeDist)
		const isTooClose = detectInArea(this, player, this.tooCloseDistX, 0, this.tooCloseDistY, 0, 0)

		// Detectar player longe
		if(isFarAway.left && !isClose.left && !isTooClose.left && !isTooClose.bottom){
			this.chasePlayer('left')
		}else if(isFarAway.right && !isClose.right && !isTooClose.right && !isTooClose.bottom){
			this.chasePlayer('right')
		}else{
			this.chasePlayer(' ')
		}

		if(closeToCharge.left && !player.isRunning){
			this.chargeAttack('left')
		}else if(closeToCharge.right && !player.isRunning){
			this.chargeAttack('right')
		}else{
			this.chargeAttack(' ')
		}

		// Quando player estever perto, ataque
		if(isClose.left && !isTooClose.left){
			this.closeAttack('left')
			buffer.fillStyle = "green"
		}else if(isClose.right && !isTooClose.right){
			this.closeAttack('right')
			buffer.fillStyle = "green"
		}else{
			this.closeAttack(' ')
		}

		// Caso player esteja perto demais, recue
		if(isTooClose.left || isTooClose.bottom){
			buffer.fillStyle = 'red'
			this.fallback('left')
		}else if(isTooClose.right || isTooClose.bottom){
			buffer.fillStyle = 'red'
			this.fallback('right')
		}

		if(developerMode){
			if(this.direction == "left"){
				buffer.fillRect(this.position.x - 500 + this.width, this.position.y + 30, 500, 10)
			}else if(this.direction == "right"){
				buffer.fillRect(this.position.x, this.position.y + 30, 500, 10)
			}
		}	
	}

	update(){
		// this.draw()
		if(!this.stopAnimation) this.animation()

		if(!this.isDead && !this.receiveDamage && !player.isDead){
			this.detectPlayer()
		}else{
			this.isAttacking = false
			this.isChargeAttack = false
			this.isRunning = false
			this.velocity.x = 0
		}
		
		if(!this.isChargeAttack && !this.isRunning && !this.isDead && !this.isAttacking && !this.receiveDamage){
			this.switchSprite(`idle_${this.direction}`)
		}

		if(this.isRunning && !this.isChargeAttack && !this.isDead && !this.isAttacking && !this.receiveDamage){
			this.switchSprite(`run_${this.direction}`)
		}

		if(this.isChargeAttack && !player.isRunning && !this.isAttacking){
			this.switchSprite(`run_attack_${this.direction}`)
		}

		if(this.isAttacking && !this.isDead && !this.receiveDamage){
			this.switchSprite(`attack_${this.attackSprite}_${this.direction}`)
		}

		if(this.sprInfo.name == `run_attack_${this.direction}`){
			if(this.currentFrames == 5){
				this.entityAttacked = false
			}
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